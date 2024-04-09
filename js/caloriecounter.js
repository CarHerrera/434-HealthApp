//Calorie counter script
const StorageCtrl = (function(){
    // Public methods
    return {
      storeItem: function(item){
        let items;
        // Check if any items in ls
        if(localStorage.getItem('items') === null){
          items = [];
          // Push new item
          items.push(item);
          // Set ls
          localStorage.setItem('items', JSON.stringify(items));
        } else {
          // Get what is already in ls
          items = JSON.parse(localStorage.getItem('items'));
  
          // Push new item
          items.push(item);
  
          // Re set ls
          localStorage.setItem('items', JSON.stringify(items));
        }
      },
      getItemsFromStorage: function(){
        let items;
        if(localStorage.getItem('items') === null){
          items = [];
        } else {
          items = JSON.parse(localStorage.getItem('items'));
        }
        return items;
      },
      updateItemStorage: function(updatedItem){
        let items = JSON.parse(localStorage.getItem('items'));
  
        items.forEach(function(item, index){
          if(updatedItem.id === item.id){
            items.splice(index, 1, updatedItem);
          }
        });
        localStorage.setItem('items', JSON.stringify(items));
      },
      deleteItemFromStorage: function(id){
        let items = JSON.parse(localStorage.getItem('items'));
        
        items.forEach(function(item, index){
          if(id === item.id){
            items.splice(index, 1);
          }
        });
        localStorage.setItem('items', JSON.stringify(items));
      },
      clearItemsFromStorage: function(){
        localStorage.removeItem('items');
      }
    }
  })();
  console.log("Storage controller", StorageCtrl)
  
  const mealInput = document.getElementById("item-name")
  const calorieInput = document.getElementById("item-calories")
  const mealListDiv = document.getElementById("meal-list")
  const clearButton = document.querySelector(".clear-btn")
  const addButton = document.querySelector(".add-btn")
  const totalCaloriesSpan = document.getElementById("total-calories")
  
  //Helper functions
  
  const addItemToList = () => {
    const newMeal  = {meal:mealInput.value, calories: parseInt(calorieInput.value), id: new Date().getTime()}
    console.log(newMeal)
    StorageCtrl.storeItem(newMeal)
    renderList()
    mealInput.value = ""
    calorieInput.value = ""
  }
  
  const renderList = () => {
    const meals = StorageCtrl.getItemsFromStorage()
    mealListDiv.innerHTML = ""
    renderTotalCalories(meals)
    meals.forEach((item) => {
      const itemDiv = document.createElement("div")
      itemDiv.classList.add("meal-list-item")
  
      const pTag = document.createElement("p")
      pTag.textContent = `${item.meal}: ${item.calories} calories`
  
      itemDiv.append(pTag)
      mealListDiv.append(itemDiv)
    })
  }
  
  const clearItems = () => {
    StorageCtrl.clearItemsFromStorage()
    renderList()
  }

  const renderTotalCalories = (meals) => {
    const totalCalories = meals.reduce((total, element) => {
        return total + element.calories
    }, 0)
    totalCaloriesSpan.textContent = totalCalories
  }
  
  addButton.addEventListener("click", addItemToList)
  clearButton.addEventListener("click", clearItems)
  //Get items from storage, display on meal list
  const init = () => {
    renderList()
  }
  window.addEventListener("DOMContentLoaded", init)