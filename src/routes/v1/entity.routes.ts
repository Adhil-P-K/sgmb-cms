import express from 'express';

import { EntityController } from '../../controllers';

const router = express.Router();
// entities Api

router.get("/entities", EntityController.getEntitiesHandler);
router.get("/entities/entityId", EntityController.getEntityHandler);
router.patch("/entities/entityId", EntityController.updateEnityHandler);
// SubEntity Api

router.get(
  "/entities/subentity/subentityId",
  EntityController.getSubEnityHandler
);
router.patch(
  "/entities/subentity/subentityId",
  EntityController.updateSubEnityHandler
);

export { router as EntityRoute };
