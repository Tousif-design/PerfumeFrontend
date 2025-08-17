import React, { useState, useEffect } from 'react';
import { Trash2, Plus, Star, Upload, Heart,Sparkles,Award } from 'lucide-react';
import { Rows } from 'lucide-react';

interface AttarFormData {
  title: string;
  description: string;
  rating: string;
  price: string;
  discount: string;
  imageFile: File | null;
  imagePreview: string | null;
}

const Collections = ({ adminAuth }: { adminAuth?: any }) => {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sessionRestored, setSessionRestored] = useState(false);
  
  // Form state - Fixed type issues by ensuring proper types
  const [newAttar, setNewAttar] = useState<AttarFormData>({
    title: '',
    description: '',
    rating: '',
    price: '',
    discount: '',
    imageFile: null,
    imagePreview: null
  });

  // Convert file to base64 for cross-browser compatibility with compression
  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      // Compress image if it's too large
      if (file.size > 2 * 1024 * 1024) { // If larger than 2MB
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        
        img.onload = () => {
          // Calculate new dimensions (max 800x800)
          const maxSize = 800;
          let { width, height } = img;
          
          if (width > height) {
            if (width > maxSize) {
              height = (height * maxSize) / width;
              width = maxSize;
            }
          } else {
            if (height > maxSize) {
              width = (width * maxSize) / height;
              height = maxSize;
            }
          }
          
          canvas.width = width;
          canvas.height = height;
          
          // Draw and compress
          ctx?.drawImage(img, 0, 0, width, height);
          canvas.toBlob((blob) => {
            if (blob) {
              const reader = new FileReader();
              reader.onload = () => resolve(reader.result as string);
              reader.onerror = reject;
              reader.readAsDataURL(blob);
            } else {
              reject(new Error('Failed to compress image'));
            }
          }, 'image/jpeg', 0.7); // 70% quality
        };
        
        img.onerror = reject;
        img.src = URL.createObjectURL(file);
      } else {
        // For smaller files, just convert directly
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
      }
    });
  };

  // Check if current user is admin
  const isAdmin = (): boolean => {
    try {
      // First priority: Check from props (passed from App.js after login)
      if (adminAuth && adminAuth.isAdmin) return true;
      
      // Second priority: Check from localStorage (remember me)
      const storedAdminAuth = localStorage.getItem('adminAuth');
      if (storedAdminAuth) {
        const parsedAuth = JSON.parse(storedAdminAuth);
        if (parsedAuth.isAdmin && parsedAuth.token && isTokenValid(parsedAuth.token)) {
          return true;
        }
      }
      
      // Third priority: Check from sessionStorage (session only)
      const sessionAdminAuth = sessionStorage.getItem('adminAuth');
      if (sessionAdminAuth) {
        const parsedAuth = JSON.parse(sessionAdminAuth);
        if (parsedAuth.isAdmin && parsedAuth.token && isTokenValid(parsedAuth.token)) {
          return true;
        }
      }
      
      // Fourth priority: Check legacy isAdmin flag
      const isAdminFlag = localStorage.getItem('isAdmin');
      if (isAdminFlag === 'true') {
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error checking admin status:', error);
      return false;
    }
  };

  // Get auth token for API calls (only for admin operations)
  const getAuthToken = (): string => {
    try {
      // First priority: Check from props
      if (adminAuth && adminAuth.token) return adminAuth.token;
      
      // Second priority: Check from localStorage (remember me)
      const storedAdminAuth = localStorage.getItem('adminAuth');
      if (storedAdminAuth) {
        const parsedAuth = JSON.parse(storedAdminAuth);
        if (parsedAuth.token && isTokenValid(parsedAuth.token)) {
          return parsedAuth.token;
        }
      }
      
      // Third priority: Check from sessionStorage (session only)
      const sessionAdminAuth = sessionStorage.getItem('adminAuth');
      if (sessionAdminAuth) {
        const parsedAuth = JSON.parse(sessionAdminAuth);
        if (parsedAuth.token && isTokenValid(parsedAuth.token)) {
          return parsedAuth.token;
        }
      }
      
      // Fourth priority: Check legacy token
      const legacyToken = localStorage.getItem('token');
      if (legacyToken && isTokenValid(legacyToken)) {
        return legacyToken;
      }
      
      return '';
    } catch (error) {
      console.error('Error getting auth token:', error);
      return '';
    }
  };

  // Fetch products from API (NO AUTH REQUIRED - public endpoint)
  const fetchProducts = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError('');
      
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
          // No Authorization header needed for viewing products
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch products (${response.status})`);
      }

      const data = await response.json();
      console.log('Fetched products:', data);
      console.log('Product imageUrls:', data.map((p: any) => ({ id: p._id, title: p.title, imageUrl: p.imageUrl })));
      setProducts(Array.isArray(data) ? data : data.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to load products. Please try again later.');
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Add product to API (ADMIN ONLY)
  const addProductToAPI = async (productData: AttarFormData): Promise<any> => {
    if (!isAdmin()) {
      throw new Error('Admin authentication required');
    }

    // Enhanced validation before API call
    if (!productData.title || !productData.title.trim()) {
      throw new Error('Product title is required');
    }
    
    if (!productData.price || parseFloat(productData.price) <= 0) {
      throw new Error('Valid price is required');
    }

    const token = getAuthToken();
    
    // Convert image file to base64 if present
    let imageBase64 = '';
    if (productData.imageFile) {
      try {
        console.log('Converting image to base64:', {
          name: productData.imageFile.name,
          size: productData.imageFile.size,
          type: productData.imageFile.type
        });
        imageBase64 = await convertFileToBase64(productData.imageFile);
        console.log('Image converted successfully, base64 length:', imageBase64.length);
      } catch (error) {
        console.error('Error converting image to base64:', error);
        // Continue without image if conversion fails
      }
    }

    // Prepare data with proper validation and defaults
    const requestData = {
      title: productData.title.trim(),
      description: productData.description ? productData.description.trim() : '',
      rating: productData.rating ? Math.min(Math.max(parseFloat(productData.rating), 0), 5) : 0,
      price: parseFloat(productData.price),
      discount: productData.discount ? Math.min(Math.max(parseInt(productData.discount), 0), 100) : 0,
      // Send base64 encoded image for cross-browser compatibility
      imageUrl: imageBase64 || '',
      // Add any other required fields that your backend might expect
      category: 'attar',
      inStock: true,
      createdAt: new Date().toISOString()
    };

    console.log('Sending product data:', { 
      ...requestData, 
      imageUrl: imageBase64 ? `base64_data_present_${imageBase64.substring(0, 50)}...` : 'no_image' 
    });
    
    const response = await fetch('http://localhost:5000/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      },
      body: JSON.stringify(requestData)
    });

    let data;
    try {
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const textResponse = await response.text();
        throw new Error(`Server returned non-JSON response: ${textResponse.substring(0, 200)}`);
      }
    } catch (parseError) {
      throw new Error(`Failed to parse server response (status ${response.status})`);
    }

    if (!response.ok) {
      const errorMessage = data.message || data.error || data.details || `Server error (${response.status})`;
      throw new Error(errorMessage);
    }

    return data;
  };

  // Handle image file selection
  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        setError('Please select a valid image file (JPEG, PNG, GIF, or WebP)');
        return;
      }

      // Validate file size (max 10MB before compression)
      if (file.size > 10 * 1024 * 1024) {
        setError('Image file size must be less than 10MB. Please select a smaller image.');
        return;
      }

      try {
        // Create preview using FileReader for cross-browser compatibility
        const preview = await convertFileToBase64(file);
        setNewAttar(prev => ({ 
          ...prev, 
          imageFile: file,
          imagePreview: preview
        }));
        setError(''); // Clear any previous errors
        
        // Show compression info if file was large
        if (file.size > 2 * 1024 * 1024) {
          console.log('Image will be compressed for optimal upload size');
        }
      } catch (error) {
        console.error('Error creating image preview:', error);
        setError('Failed to process image file. Please try a different image.');
      }
    }
  };

  // Handle add attar (ADMIN ONLY)
  const handleAddAttar = async () => {
    if (!isAdmin()) {
      setError('Only administrators can add products. Please log in as admin.');
      return;
    }

    // Validation
    if (!newAttar.title.trim()) {
      setError('Product title is required');
      return;
    }
    
    if (!newAttar.price || parseFloat(newAttar.price) <= 0) {
      setError('Valid price is required');
      return;
    }

    try {
      setIsSubmitting(true);
      setError('');

      console.log('Submitting attar data:', {
        ...newAttar,
        imageFile: newAttar.imageFile ? {
          name: newAttar.imageFile.name,
          size: newAttar.imageFile.size,
          type: newAttar.imageFile.type
        } : null,
        imagePreview: newAttar.imagePreview ? 'base64_data_present' : null
      });
      
      const addedProduct = await addProductToAPI(newAttar);
      console.log('Attar added successfully:', addedProduct);
      console.log('New product imageUrl:', addedProduct.imageUrl);

      // Add to local state
      setProducts(prev => [...prev, addedProduct]);
      
      // Reset form
      setNewAttar({
        title: '',
        description: '',
        rating: '',
        price: '',
        discount: '',
        imageFile: null,
        imagePreview: null
      });
      
      setShowAddForm(false);
    } catch (error) {
      console.error('Error adding attar:', error);
      setError(error instanceof Error ? error.message : 'Failed to add attar');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete product using DELETE API endpoint
  const handleDelete = async (productId: string) => {
    if (!isAdmin()) {
      setError('Only administrators can delete products.');
      return;
    }

    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      const token = getAuthToken();
      
      const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to delete product (${response.status})`);
      }

      // Remove from local state immediately after successful API call
      setProducts(prev => prev.filter(product => product._id !== productId));
      setError(''); // Clear any previous errors
      console.log('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
      setError('Failed to delete product: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  };

  // Handle admin button click
  const handleAdminButtonClick = () => {
    if (!isAdmin()) {
      setError('Admin authentication required. Please log in as admin to add products.');
      // Redirect to login after a short delay
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
      return;
    }
    setShowAddForm(!showAddForm);
    setError('');
  };

  // Handle logout
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      try {
        // Clear all authentication data
        localStorage.removeItem('adminAuth');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('isAdmin');
        
        sessionStorage.removeItem('adminAuth');
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('isAdmin');
        
        console.log('Logged out successfully');
        
        // Redirect to login page
        window.location.href = '/login';
      } catch (error) {
        console.error('Error during logout:', error);
        // Force redirect anyway
        window.location.href = '/login';
      }
    }
  };

  // Render star rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} size={16} className="text-yellow-500 fill-yellow-500" />
      );
    }
    
    // Half star
    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star size={16} className="text-gray-300" />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star size={16} className="text-yellow-500 fill-yellow-500" />
          </div>
        </div>
      );
    }
    
    // Empty stars
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} size={16} className="text-gray-300" />
      );
    }
    
    return stars;
  };

  // Handle image error with fallback
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    console.log('Image failed to load:', target.src);
    target.style.display = 'none';
    const fallback = target.parentElement?.querySelector('.image-fallback') as HTMLElement;
    if (fallback) {
      fallback.style.display = 'flex';
    }
  };

  useEffect(() => {
    fetchProducts(); // Always fetch products regardless of admin status
  }, []);

  // Restore admin session from storage on component mount
  useEffect(() => {
    const restoreAdminSession = () => {
      try {
        // Check localStorage first (remember me), then sessionStorage
        let storedAuth = localStorage.getItem('adminAuth');
        let storageType = 'localStorage';
        
        if (!storedAuth) {
          storedAuth = sessionStorage.getItem('adminAuth');
          storageType = 'sessionStorage';
        }
        
        if (storedAuth) {
          const parsedAuth = JSON.parse(storedAuth);
          if (parsedAuth.isAdmin && parsedAuth.token) {
            // Validate token expiration
            if (isTokenValid(parsedAuth.token)) {
              console.log('Restored admin session from', storageType);
              setSessionRestored(true);
            } else {
              console.log('Stored token has expired, clearing session');
              // Clear expired token
              if (storageType === 'localStorage') {
                localStorage.removeItem('adminAuth');
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                localStorage.removeItem('isAdmin');
              } else {
                sessionStorage.removeItem('adminAuth');
                sessionStorage.removeItem('user');
                sessionStorage.removeItem('token');
                sessionStorage.removeItem('isAdmin');
              }
            }
          }
        }
      } catch (error) {
        console.error('Error restoring admin session:', error);
      }
    };

    restoreAdminSession();
  }, [adminAuth]);

  // Check if JWT token is valid (not expired)
  const isTokenValid = (token: string): boolean => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp > currentTime;
    } catch (error) {
      console.error('Error validating token:', error);
      return false;
    }
  };

  const currentUserIsAdmin = isAdmin();

  // Force re-render when session is restored
  useEffect(() => {
    if (sessionRestored) {
      // This will trigger a re-render and update the UI
      console.log('Session restored, updating UI');
    }
  }, [sessionRestored]);

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#f8efe3] via-[#f6e7d7] to-[#f3e3c3] ornament-pattern-ultra relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 lg:mb-20 animate-fade-in-up">
          <div className="flex items-center justify-center mb-6 lg:mb-8">
            <div className="w-16 sm:w-20 h-0.5 sm:h-1 bg-gold-gradient-ultra mr-4 sm:mr-6"></div>
            <div className="flex items-center mobile-gap">
              <Sparkles className="mobile-icon text-gold-500 animate-luxury-pulse" />
              <span className="text-gold-700 font-playfair font-bold tracking-wider uppercase mobile-text-lg drop-shadow-lg">Attar Collections</span>
              <Award className="mobile-icon text-gold-500 animate-luxury-pulse" />
            </div>
            <div className="w-16 sm:w-20 h-0.5 sm:h-1 bg-gold-gradient-ultra ml-4 sm:ml-6"></div>
          </div>
          <h2 className="font-playfair mobile-hero-text font-bold mb-6 lg:mb-8 text-shadow-ultra text-gold-900">
            Discover Our <span className="text-gradient-ultra">Attars</span>
          </h2>
          <p className="mobile-text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed font-light">
            Explore our curated selection of attars, each crafted with the finest ingredients and a passion for olfactory artistry. Find your signature scent and save your favorites.
          </p>
        </div>

          {/* Add New Attar Button - Always visible but shows different behavior */}
          <div className="flex flex-col sm:flex-row justify-center items-center mb-8 gap-3 sm:gap-4 px-4">
            {/* Back to Home button - Only show for admins */}
            {currentUserIsAdmin && (
              <button
                onClick={() => window.location.href = '/'}
                className="bg-gradient-to-r from-amber-700 to-amber-800 text-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base md:text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-amber-600 shadow-lg w-full sm:w-auto min-w-[140px] sm:min-w-[160px]"
              >
                ← Back to Home
              </button>
            )}
            
            {/* Add New Attar button - Only show for admins */}
            {currentUserIsAdmin && (
              <button
                onClick={handleAdminButtonClick}
                className="bg-gradient-to-r from-amber-700 to-amber-800 text-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base md:text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-amber-600 shadow-lg w-full sm:w-auto min-w-[140px] sm:min-w-[160px]"
              >
                <Plus className="inline mr-2" size={18} />
                Add New Attar
              </button>
            )}
            
            {/* Logout button - Only show for admins */}
            {currentUserIsAdmin && (
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-red-600 to-red-700 text-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base md:text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-red-500 shadow-lg w-full sm:w-auto min-w-[140px] sm:min-w-[160px]"
              >
                Logout
              </button>
            )}
            
            {/* Show message for non-admin users */}
            {!currentUserIsAdmin && (
              <div className="text-center">
                
              </div>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="max-w-2xl mx-auto mb-6 bg-red-100/80 backdrop-blur-sm border border-red-400 text-red-700 px-6 py-4 rounded-xl">
              {error}
              {!currentUserIsAdmin && error.includes('Admin authentication') && (
                <div className="mt-2">
                  <a href="/login" className="text-red-800 underline font-medium">
                    Click here to log in as admin
                  </a>
                </div>
              )}
            </div>
          )}

          {/* Add Form - Only show if admin */}
          {showAddForm && currentUserIsAdmin && (
            <div className="max-w-2xl mx-auto mb-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
              <h2 className="text-3xl font-bold text-amber-900 mb-6 text-center">Add New Attar</h2>
              
              <div className="space-y-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder=" "
                    value={newAttar.title}
                    onChange={(e) => setNewAttar(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-6 py-4 text-lg rounded-xl border-2 border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent peer"
                    disabled={isSubmitting}
                  />
                  <label className="absolute text-lg text-amber-600 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-amber-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-4">
                    Attar Name *
                  </label>
                </div>

                <div className="relative">
                  <textarea
                    placeholder=" "
                    value={newAttar.description}
                    onChange={(e) => setNewAttar(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-6 py-4 text-lg rounded-xl border-2 border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent peer resize-none"
                    rows={3}
                    disabled={isSubmitting}
                  />
                  <label className="absolute text-lg text-amber-600 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-amber-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-6 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-4">
                    Description
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="relative">
                    <input
                      type="number"
                      placeholder=" "
                      value={newAttar.price}
                      onChange={(e) => setNewAttar(prev => ({ ...prev, price: e.target.value }))}
                      className="w-full px-6 py-4 text-lg rounded-xl border-2 border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent peer"
                      min="0"
                      step="0.01"
                      disabled={isSubmitting}
                    />
                    <label className="absolute text-lg text-amber-600 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-amber-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-4">
                      Price (₹) *
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      type="number"
                      placeholder=" "
                      value={newAttar.rating}
                      onChange={(e) => setNewAttar(prev => ({ ...prev, rating: e.target.value }))}
                      className="w-full px-6 py-4 text-lg rounded-xl border-2 border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent peer"
                      min="0"
                      max="5"
                      step="0.1"
                      disabled={isSubmitting}
                    />
                    <label className="absolute text-lg text-amber-600 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-amber-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-4">
                      Rating (0-5)
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      type="number"
                      placeholder=" "
                      value={newAttar.discount}
                      onChange={(e) => setNewAttar(prev => ({ ...prev, discount: e.target.value }))}
                      className="w-full px-6 py-4 text-lg rounded-xl border-2 border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent peer"
                      min="0"
                      max="100"
                      disabled={isSubmitting}
                    />
                    <label className="absolute text-lg text-amber-600 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-amber-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-4">
                      Discount (%)
                    </label>
                  </div>
                </div>

                {/* Image Upload Section with Preview */}
                <div className="space-y-4">
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileChange}
                      className="w-full px-6 py-4 text-lg rounded-xl border-2 border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                      disabled={isSubmitting}
                    />
                    <label className="absolute text-lg text-amber-600 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 left-4">
                      Product Image (JPEG, PNG, GIF, WebP - Max 10MB)
                    </label>
                  </div>
                  
                  {/* Image Preview */}
                  {newAttar.imagePreview && (
                    <div className="mt-4">
                      <p className="text-sm text-green-600 mb-2">Image Preview:</p>
                      <div className="relative w-32 h-32 rounded-lg overflow-hidden border-2 border-amber-200">
                        <img
                          src={newAttar.imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            console.error('Preview image error:', e);
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {newAttar.imageFile?.name} ({(newAttar.imageFile?.size / 1024 / 1024).toFixed(2)} MB)
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handleAddAttar}
                    disabled={isSubmitting}
                    className="flex-1 bg-gradient-to-r from-amber-500 to-yellow-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Adding...' : 'Add Attar'}
                  </button>
                  
                  <button
                    onClick={() => {
                      setShowAddForm(false);
                      setError('');
                      setNewAttar({
                        title: '',
                        description: '',
                        rating: '',
                        price: '',
                        discount: '',
                        imageFile: null,
                        imagePreview: null
                      });
                    }}
                    disabled={isSubmitting}
                    className="flex-1 bg-gray-500 text-white py-4 px-6 rounded-xl font-bold text-lg hover:bg-gray-600 transition-colors duration-300 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Products Grid - Card design matching the image */}
          {isLoading ? (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-4 border-amber-600"></div>
              <p className="mt-4 text-amber-700 text-xl">Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-amber-700 text-2xl">No products available</p>
              <p className="text-amber-600 text-lg mt-2">
                {currentUserIsAdmin ? 'Add your first attar to get started' : 'Products will appear here once added by admin'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => {
                console.log(`Rendering product: ${product.title}, imageUrl: ${product.imageUrl}`);
                return (
                  <div
                    key={product._id}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative group"
                  >
                  {/* Bestseller Badge */}
                  {product.rating >= 4 && (
                    <div className="absolute top-3 left-3 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10">
                      Bestseller
                    </div>
                  )}
                  
                  {/* Delete button - Only show for admins */}
                  {currentUserIsAdmin && (
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="absolute top-3 right-3 bg-white/90 text-red-500 p-2 rounded-full hover:bg-red-500 hover:text-white transition-all duration-200 shadow-md z-10 opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}

                  {/* Product Image with improved cross-browser handling */}
                  <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                    {product.imageUrl ? (
                      <>
                        <img
                          src={`http://localhost:5000${product.imageUrl}`}
                          alt={product.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            console.error('Image failed to load:', (e.target as HTMLImageElement).src);
                            handleImageError(e);
                          }}
                          onLoad={() => console.log('Image loaded successfully:', product.title)}
                          loading="lazy"
                        />
                        <div className="image-fallback absolute inset-0 flex items-center justify-center" style={{display: 'none'}}>
                          <Upload size={48} className="text-gray-400" />
                        </div>
                      </>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Upload size={48} className="text-gray-400" />
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center">
                        {renderStars(product.rating || 0)}
                      </div>
                      <span className="text-sm text-gray-600">
                        {product.rating ? product.rating.toFixed(1) : '0.0'} (80 reviews)
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
                      {product.title}
                    </h3>
                    
                    {/* Description */}
                    {product.description && (
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {product.description}
                      </p>
                    )}
                    
                    {/* Price */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-gray-900">
                          ₹{product.price}
                        </span>
                        {product.discount > 0 && (
                          <>
                            <span className="text-sm text-gray-500 line-through">
                              ₹{(product.price * (1 + product.discount / 100)).toFixed(0)}
                            </span>
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                              Save {product.discount}%
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Collections;