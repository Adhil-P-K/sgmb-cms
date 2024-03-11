import express from 'express';

import { EntityController } from '../../controllers';

const router = express.Router();
// entities Api

router.get("/entities", EntityController.readEntitiesHandler);
router.get("/entities/entityId", EntityController.readEntityHandler);
router.patch("/entities/entityId", EntityController.updateEnityHandler);
// SubEntity Api

router.get(
  "/entities/subentity/subentityId",
  EntityController.readSubEnityHandler
);
router.patch(
  "/entities/subentity/subentityId",
  EntityController.updateSubEnityHandler
);

export { router as EntityRoute };
