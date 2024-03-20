import { MongoClient } from 'mongodb';

import { appConfig } from '../config';

let dbInstance: any = null;

async function initDb(connectionUrl: string, callback: any) {
  try {
    const client = new MongoClient(connectionUrl);

    await client.connect();

    const db: any = client.db(appConfig.db.database);

    db.users = db.collection('users');
    db.events = db.collection('events');
    db.services = db.collection('services');
    db.entities = db.collection('entities');
    db.departments = db.collection('departments');
    db.notifications = db.collection('notifications');
    db.Notifications = db.collection('c_notifications');
    db.passwordResetTokens = db.collection('password-reset-tokens');
    db.calendarRequests = db.collection('calendar-requests');
    db.eventVenues = db.collection('event-venues');
    db.eventCategories = db.collection('event-categories');
    db.syslogs = db.collection('syslogs');
    db.contents = db.collection('contents');
    await db.contents.createIndex({ key: 1 }, { unique: true });
    dbInstance = db;

    return callback(null, db);
  } catch (error) {
    return callback(error);
  }
}
function getDb() {
  return dbInstance;
}

export { getDb, initDb };
export * from './user.repository';
export * from './entity.repository';
export * from './department.repository';
export * from './higher.management.repository';
