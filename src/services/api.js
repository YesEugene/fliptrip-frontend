import axios from 'axios';

// Автоматическое определение API URL для разных окружений
const getApiBaseUrl = () => {
  // Если указана переменная окружения, используем её
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL.replace('/api', ''); // Убираем /api из конца
  }
  
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }
  
  // В продакшене используем backend URL
  if (import.meta.env.PROD) {
    return 'https://fliptripbackend.vercel.app'; // Прямая ссылка на backend
  }
  
  // В разработке используем localhost
  return 'http://localhost:3000';
};

const API_BASE_URL = getApiBaseUrl();

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Generate preview with title and subtitle
export const generatePreview = async (formData) => {
  try {
    const response = await api.post('/api/generate-preview', {
      city: formData.city,
      audience: formData.audience,
      interests: formData.interests,
      date: formData.date,
      budget: formData.budget,
    });
    return response.data;
  } catch (error) {
    console.error('Preview generation error:', error);
    throw error;
  }
};

// Generate full itinerary after payment
export const generateItinerary = async (formData) => {
  try {
    const response = await api.post('/api/generate-itinerary', formData);
    return response.data;
  } catch (error) {
    console.error('Itinerary generation error:', error);
    throw error;
  }
};

// Generate smart itinerary with budget optimization
export const generateSmartItinerary = async (formData) => {
  try {
    const response = await api.post('/api/smart-itinerary', formData);
    return response.data;
  } catch (error) {
    console.error('Smart itinerary generation error:', error);
    throw error;
  }
};

// Generate smart itinerary v2 with new architecture
export const generateSmartItineraryV2 = async (formData) => {
  try {
    const response = await api.post('/api/smart-itinerary-v2', formData);
    return response.data;
  } catch (error) {
    console.error('Smart itinerary v2 generation error:', error);
    throw error;
  }
};

// Generate creative itinerary - НОВАЯ АРХИТЕКТУРА
export const generateCreativeItinerary = async (formData) => {
  try {
    console.log('🎨 Generating creative itinerary with:', formData);
    const response = await api.post('/api/creative-itinerary', formData);
    console.log('✅ Creative itinerary response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Creative itinerary generation error:', error);
    throw error;
  }
};

// Generate real places itinerary - ПРОСТАЯ НАДЕЖНАЯ СИСТЕМА
export const generateRealPlacesItinerary = async (formData) => {
  try {
    console.log('🌍 Generating real places itinerary with v3 system:', formData);
    const response = await api.post('/api/generate-itinerary-v3', formData);
    console.log('✅ Real places itinerary v3 response:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Generate-itinerary-v3 failed:', error);
    console.error('Error details:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message
    });
    
    // НЕ используем fallback - пусть ошибка пройдет дальше
    // Это поможет увидеть реальную проблему
    throw error;
  }
};

// Generate PDF
export const generatePDF = async (itinerary) => {
  try {
    // For now, return mock PDF data
    // In real implementation, this would call the PDF API
    return new Blob(['Mock PDF content'], { type: 'application/pdf' });
  } catch (error) {
    console.error('PDF generation error:', error);
    throw error;
  }
};

// Create Stripe checkout session
export const createCheckoutSession = async (formData) => {
  try {
    const response = await api.post('/api/create-checkout-session', formData);
    return response.data;
  } catch (error) {
    console.error('Checkout session creation error:', error);
    throw error;
  }
};

// Send email with itinerary
export const sendEmail = async (emailData) => {
  try {
    console.log('📧 Sending email with:', emailData);
    const response = await api.post('/api/send-email', emailData);
    console.log('✅ Email sent successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Email sending error:', error);
    throw error;
  }
};

// Get examples list
export const getExamples = async () => {
  try {
    const response = await api.get('/api/examples');
    return response.data;
  } catch (error) {
    console.error('Error getting examples:', error);
    throw error;
  }
};

// Get specific example
export const getExample = async (exampleId) => {
  try {
    const response = await api.get(`/api/examples/${exampleId}`);
    return response.data;
  } catch (error) {
    console.error('Error getting example:', error);
    throw error;
  }
};

export default api;
