// Shared helpers used by the Mongoose models' toJSON transforms.
// Goal: API responses look like the frontend's mock data (id instead of _id, etc.)

// _id -> id, remove __v
export const baseTransform = (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  };
  
  // Date -> "2026-10-05" (the same format the frontend already creates for new records)
  export const toShortDate = (value) =>
    value instanceof Date && !isNaN(value) ? value.toISOString().split('T')[0] : value;
  
  // Date -> "October 5, 2026" (the format used by the Reports page mock data)
  export const toLongDate = (value) =>
    value instanceof Date && !isNaN(value)
      ? value.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
      : value;
  
  // The frontend shows the asset NAME (e.g. "Client API"), but the database stores an
  // ObjectId reference. When the asset has been populated, send the name as `asset`
  // and keep the reference id as `assetId`.
  export const flattenAsset = (ret) => {
    if (ret.asset && typeof ret.asset === 'object' && ret.asset.name) {
      ret.assetId = ret.asset.id || String(ret.asset._id);
      ret.asset = ret.asset.name;
    }
    return ret;
  };
  