import { categorySelector } from "@/stores/rootSelector";
import { categoryThunk } from "@/stores/rootThunk";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useCategories() {
  const dispatch = useDispatch();
  const status = useSelector(categorySelector.selectCategoryStatus);
  const category = useSelector(categorySelector.selectCategoryItems);

  useEffect(() => {
    if (status === "idle") {
      dispatch(categoryThunk.fetchCategory());
    }
  }, [status]);

  return { category, status };
}
