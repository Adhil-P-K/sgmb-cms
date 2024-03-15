import express from 'express';

import { EntityController } from '../../controllers';
import { EntityService } from '../../services';

const router = express.Router();
// entities Api

router.get('/', EntityController.getEntitiesHandler);
router.get('/:entityId', EntityController.getEntityHandler);
router.patch('/:entityId', EntityService.uploadEntityLogoHandler, EntityController.updateEnityHandler);
// SubEntity Api

router.get('/subentity/:subentityId', EntityController.getSubEnityHandler);
router.patch('/subentity/:subentityId', EntityController.updateSubEnityHandler);

export { router as EntityRoute };
