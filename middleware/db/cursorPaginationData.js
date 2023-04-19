/** @define: this function is responsible for cursor based pagination*/
const cursorPaginationData = async (collection, params) => {
  try {
    const {
      limit = 300,
      field = '_id',
      nextCursor: cursor = false,
      where = {},
      projection = []
    } = params;
    let query = where;
    /** Get next cursor, on based of last cursor*/
    if (cursor) {
      query = {
        [field]: {
          $lte: cursor
        },
        ...where
      };
    }

    const fieldsToProject = {};
    if (projection.length) {
      fieldsToProject[field] = 1;
      projection.map((value) => {
        fieldsToProject[value] = 1;
      });
    }
    /** Get data from collection will be having limit+1, +1 will be for next cursor*/
    const response = await collection
      .find(query, fieldsToProject)
      .sort({ [field]: -1 })
      .limit(limit + 1)
      .exec();

    const hasMore = response.length === limit + 1;
    let nextCursor = null;
    if (hasMore) {
      const nextCursorRecord = response[limit];
      nextCursor = nextCursorRecord[field];
      response.pop();
    }
    return { data: response, nextCursor };
  } catch (error) {
    throw error;
  }
};

module.exports = { cursorPaginationData };
