import authRoutes from './authRoutes.js';
import userPreferenceRoutes from './userPreferenceRoutes.js';
import listinRoutes from './listingRoutes.js'

export default function registerRoutes(app) {
  app.use('/auth', authRoutes);
  app.use('/user/preferences',userPreferenceRoutes);
  app.use('/user/listings',listinRoutes);
}
