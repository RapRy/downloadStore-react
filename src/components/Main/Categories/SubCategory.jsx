import React, { useEffect, useState } from "react";

import { getContentsBySub } from "../../../api";

const SubCategory = ({ subcat }) => {
  const [contents, setContents] = useState([]);

  const getContents = async (subcat) => {
    console.log(subcat);
    try {
      const data = await getContentsBySub(subcat?.catName, subcat?.subCatName);
      console.log(data);
    } catch (error) {
      console.log(console.error);
    }
  };

  useEffect(() => {
    getContents(subcat);
  }, [subcat]);

  return <div>{subcat.subCatName}</div>;
};

export default SubCategory;
