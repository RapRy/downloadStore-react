import React from "react";

import { getContentsBySub } from "../../../api";

const SubCategory = ({ subcat }) => {
  return <div>{subcat.subCatName}</div>;
};

export default SubCategory;
