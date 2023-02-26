import { db } from '../app/database';

abstract class AbstractServices {
  protected db = db;
}

export default AbstractServices;
