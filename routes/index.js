import authRoutes from './authRoutes.js';
import userPreferenceRoutes from './userPreferenceRoutes.js';
import listingRoutes from './listingRoutes.js'
import userRoutes from './userRoutes.js'
export default function registerRoutes(app) {
  app.use('/auth', authRoutes);
  app.use('/user/preferences',userPreferenceRoutes);
  app.use('/user/listings',listingRoutes);
  app.use('/user',userRoutes);

}
