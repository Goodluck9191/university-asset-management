// src/services/assetService.js (Frontend-only version)
let assets = JSON.parse(localStorage.getItem('assets') || '[]');

const normalizeStatus = (status) => {
  if (!status) return 'available';
  
  const statusLower = String(status).toLowerCase().trim();
  switch (statusLower) {
    case 'in-use':
    case 'in use':
    case 'use':
      return 'in-use';
    case 'maintenance':
      return 'maintenance';
    case 'retired':
      return 'retired';
    case 'available':
      return 'available';
    default:
      return statusLower;
  }
};

export const assetService = {
  getAllAssets: async () => {
    console.log('📦 Using frontend storage only');
    return { 
      data: assets.map(asset => ({
        ...asset,
        status: normalizeStatus(asset.status)
      }))
    };
  },

  createAsset: async (assetData) => {
    const newAsset = {
      ...assetData,
      assetId: Date.now(),
      status: normalizeStatus(assetData.status),
      createdAt: new Date().toISOString()
    };
    
    assets.push(newAsset);
    localStorage.setItem('assets', JSON.stringify(assets));
    console.log('💾 Saved new asset:', newAsset);
    
    return { data: newAsset };
  },

  getAssetById: async (id) => {
    const asset = assets.find(a => a.assetId == id || a.id == id);
    if (!asset) throw new Error('Asset not found');
    
    return { 
      data: {
        ...asset,
        status: normalizeStatus(asset.status)
      }
    };
  },

  updateAsset: async (id, assetData) => {
    const index = assets.findIndex(a => a.assetId == id || a.id == id);
    if (index === -1) throw new Error('Asset not found');
    
    const updatedAsset = {
      ...assets[index],
      ...assetData,
      status: normalizeStatus(assetData.status)
    };
    
    assets[index] = updatedAsset;
    localStorage.setItem('assets', JSON.stringify(assets));
    
    return { data: updatedAsset };
  },

  deleteAsset: async (id) => {
    assets = assets.filter(a => !(a.assetId == id || a.id == id));
    localStorage.setItem('assets', JSON.stringify(assets));
    
    return { success: true };
  }
};