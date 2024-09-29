export function filtering(query: string, filters: Record<string, any>, queryParams: (string | boolean | number)[]
): string {
  
  Object.entries(filters).forEach(([key, value], index) => {
    
    if (value) {
      queryParams.push(value);
      if (index === 0) {
        query += ` WHERE "${key}" = $${queryParams.length}`;
      } else {
        query += ` AND "${key}" = $${queryParams.length}`;
      }
    }
  });

  return query;
}

export function sorting(query: string, sort?: string): string {
  
  if (sort) {
    const [sortCol, sortDir] = sort.split("_");
    query += ` ORDER BY ${sortCol} ${sortDir.toUpperCase() || " ASC"}`;
  }
  return query;
}