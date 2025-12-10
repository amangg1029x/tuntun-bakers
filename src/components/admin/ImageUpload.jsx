import React, { useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { toast } from 'react-hot-toast';

const ImageUpload = ({ currentImage, onImageChange, onImageRemove }) => {
  const [preview, setPreview] = useState(currentImage || '');
  const [uploading, setUploading] = useState(false);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    setUploading(true);

    // Convert to base64
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      setPreview(base64String);
      onImageChange(base64String);
      setUploading(false);
    };
    reader.onerror = () => {
      toast.error('Failed to read image');
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    setPreview('');
    onImageRemove();
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-gray-700">Product Image</label>
      
      {preview ? (
        <div className="relative">
          <img
            src={preview}
            alt="Product preview"
            className="w-full h-64 object-cover rounded-xl border-2 border-gray-200"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <label className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-amber-500 hover:bg-amber-50 transition-all">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            disabled={uploading}
          />
          {uploading ? (
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-sm text-gray-600">Processing image...</p>
            </div>
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Upload className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-sm font-semibold text-gray-700 mb-1">Click to upload image</p>
              <p className="text-xs text-gray-500">PNG, JPG, WEBP up to 5MB</p>
            </div>
          )}
        </label>
      )}
      <p className="text-xs text-gray-500 italic">Recommended: Square image (800x800px) for best results</p>
    </div>
  );
};

export default ImageUpload;