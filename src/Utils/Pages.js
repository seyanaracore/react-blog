export const getPagesCountList = (itemsTotalCount, perPage) => {
   return new Array(Math.ceil(itemsTotalCount / perPage))
      .fill()
      .map((_, idx) => idx + 1);
};
