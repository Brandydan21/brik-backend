import authRoutes from './authRoutes.js';
import userPreferenceRoutes from './userPreferenceRoutes.js';


export default function registerRoutes(app) {
  app.use('/auth', authRoutes);
  app.use('/preferences',userPreferenceRoutes);
}
