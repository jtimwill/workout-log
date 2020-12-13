export function findCategory(category_id, categories) {
    const category = categories.find((category) => {
        return category.id === category_id;
    });
    return category ? category.name : "";
  }

export function findNameById(arr, id) {
    for(let item of arr) 
      if (item.id === id)
        return item.name;
    return "";
}