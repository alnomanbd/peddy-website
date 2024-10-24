//! Load category
const loadCategory = () => {
    fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    .then((data) => displayCategory(data.categories));
};

  //! Display Category
const displayCategory = (data) => {
    data.forEach((category) => {
    const button = document.createElement("button");
    button.setAttribute("class", "buttons");
    button.classList.add(
        "px-16",
        "py-4",
        "border",
        "border-blue-100",
        "rounded-xl",
        "m-2",
        "flex",
        "items-center",
        "gap-3",
        "text-xl",
        "font-bold",
        "font-inter",
        "justify-center"
    );

    button.innerHTML = `      
    <img src="${category.category_icon}" alt="icon">
    ${category.category}`;
    
    document.getElementById("category-container").appendChild(button);
    
    //! Toggle category buttons
    const btns = document.getElementsByClassName("buttons");
    button.addEventListener("click", function () {
        loadCategoryPets(category.category);
        for (const btn of btns) {
          btn.classList.remove(
            "border-[#0E7A81]",
            "rounded-full",
            "bg-[#0e7a811a]"
          );
        }
        button.classList.add(
          "border-[#0E7A81]",
          "rounded-full",
          "bg-[#0e7a811a]"
        );
  
        document.getElementById("card-container").innerHTML = "";
      });
    });
  };
  
document.getElementById("view-more").addEventListener("click", function () {
    document.getElementById("best-friend-section").scrollIntoView({ behavior: "smooth" });
});
  
  //! All Pets API
const loadPets = async () => {
    const responsive = await fetch(
        "https://openapi.programming-hero.com/api/peddy/pets"
    );
    const data = await responsive.json();
    displayPets(data.pets);
    sort(data.pets);
};

//! Loading
const loading = document.getElementById("loading");

//! Sort data
const sort = (pets) => {
    const sortButton = document.getElementById("sort-btn");
    sortButton.addEventListener("click", function () {
        pets.sort((price1, price2) => price2.price - price1.price);
        displayPets(pets);
    });
};

  //! Display All pets
const displayPets = (pets) => {
    loading.style.display = "block";
    setTimeout(() => {
      loading.style.display = "none";
      pets.forEach((pet) => {
        const div = document.createElement("div");
        div.classList.add("w-[260px]", "lg:w-[300px]");
        div.setAttribute("id", "divc");
        div.innerHTML = `
              <div class="border p-4 rounded-xl">
                  <div><img class = "rounded-lg" src="${
                    pet.image
                  }" alt="" /></div>
                  <div class="mt-6 space-y-1 text-[#131313b3]">
                    <h1 class="font-inter text-lg font-bold text-black">
                     ${
                       pet.pet_name === undefined || pet.pet_name === null
                         ? "N/A"
                         : pet.pet_name
                     }
                    </h1>
                    <div class="flex gap-2">
                      <img src="images/category.svg" alt="" />Breed: ${
                        pet.breed === undefined || pet.breed === null
                          ? "N/A"
                          : pet.breed
                      }
                    </div>
                    <div class="flex gap-2">
                      <img src="images/calender.svg" alt="" />Birth: ${
                        pet.date_of_birth === undefined ||
                        pet.date_of_birth === null
                          ? "N/A"
                          : new Date(pet.date_of_birth).getFullYear()
                      }
                    </div>
                    <div class="flex gap-2">
                      <img src="images/gender.svg" alt="" />Gender: ${
                        pet.gender === undefined || pet.gender === null
                          ? "N/A"
                          : pet.gender
                      }
                    </div>
                    <div class="flex gap-2">
                      <img src="images/dollar.svg" alt="" />Price : ${
                        pet.price === undefined || pet.price === null
                          ? "N/A"
                          : pet.price
                      }
                    </div>
                  </div>
                  <hr class="mt-4" />
                  <div class="mt-4 flex items-center gap-3">
                    <button
                      class="lg:border md:border lg:py-3 lg:px-4 rounded-lg" onclick="favBtn('${
                        pet.image
                      }')"
                    >
                      <img src="images/like.svg" alt="like"/>
                    </button>
                    <button
                      class="border py-2 px-4 font-bold text-lg text-[#0E7A81] rounded-lg"
                      onclick="adopted(this)"
                    >
                      Adopt
                    </button>
                    <button
                      class="border py-2 px-4 font-bold text-lg text-[#0E7A81] rounded-lg"
                      onclick="loadPetDetails(${pet.petId})"
                    >
                      Details
                    </button>
                  </div>
                </div>`;
        document.getElementById("card-container").appendChild(div);
      });
    }, 2000);
    document.getElementById("card-container").innerHTML = "";
};
//! Load category
const loadCategoryPets = async (categoryId) => {
    const response = await fetch(
      `https://openapi.programming-hero.com/api/peddy/category/${categoryId}`
    );
    const data = await response.json();
    displayCategoryPets(data.data);
  };
  
  //! Display category pets
  const displayCategoryPets = (categoryPets) => {
    loading.style.display = "block";
  
    document.getElementById("error-section").classList.add("hidden");
  
    setTimeout(() => {
      if (categoryPets.length === 0) {
        document.getElementById("sort-btn").setAttribute("disabled", true);
        document.getElementById("error-section").classList.remove("hidden");
        loading.style.display = "none";
        return;
      }
      for (const pet of categoryPets) {
        document.getElementById("sort-btn").removeAttribute("disabled");
        const div = document.createElement("div");
        div.classList.add("w-[260px]", "lg:w-[300px]");
  
        div.innerHTML = `
                      <div class="border p-4 rounded-xl">
                          <div><img class = "rounded-lg" src="${
                            pet.image
                          }" alt="" /></div>
                          <div class="mt-6 space-y-1 text-[#131313b3]">
                            <h1 class="font-inter text-lg font-bold text-black">
                             ${
                               pet.pet_name === undefined || pet.pet_name === null
                                 ? "N/A"
                                 : pet.pet_name
                             }
                            </h1>
                            <div class="flex gap-2">
                              <img src="images/category.svg" alt="" />Breed: ${
                                pet.breed === undefined || pet.breed === null
                                  ? "N/A"
                                  : pet.breed
                              }
                            </div>
                            <div class="flex gap-2">
                              <img src="images/calender.svg" alt="" />Birth: ${
                                pet.date_of_birth === undefined ||
                                pet.date_of_birth === null
                                  ? "N/A"
                                  : new Date(pet.date_of_birth).getFullYear()
                              }
                            </div>
                            <div class="flex gap-2">
                              <img src="images/gender.svg" alt="" />Gender: ${
                                pet.gender === undefined || pet.gender === null
                                  ? "N/A"
                                  : pet.gender
                              }
                            </div>
                            <div class="flex gap-2">
                              <img src="images/dollar.svg" alt="" />Price : ${
                                pet.price === undefined || pet.price === null
                                  ? "N/A"
                                  : pet.price
                              }
                            </div>
                          </div>
                          <hr class="mt-4" />
                          <div class="mt-4 flex items-center gap-3">
                            <button
                              class="lg:border md:border lg:py-3 lg:px-4 rounded-lg" onclick="favBtn('${
                                pet.image
                              }')"
                            >
                              <img src="images/like.svg" alt="like"/>
                            </button>
                            <button
                              class="border py-2 px-4 font-bold text-lg text-[#0E7A81] rounded-lg"
                              onclick="adopted(this)"
                            >
                              Adopt
                            </button>
                            <button
                              class="border py-2 px-4 font-bold text-lg text-[#0E7A81] rounded-lg" id="details-btn"
                              onclick="loadPetDetails(${pet.petId})"
                            >
                              Details
                            </button>
                          </div>
                        </div>`;
  
        document.getElementById("card-container").appendChild(div);
      }
      loading.style.display = "none";
    }, 2000);
  };
  //! Favorite pet
  const favBtn = (petImage) => {
    const favContainer = document.getElementById("favorite-container");
    const div = document.createElement("div");
    div.innerHTML = `<img class="rounded-lg w-[75px] md:w-[140px] lg:w-52" src="${petImage}" alt="like"/>`;
    favContainer.appendChild(div);
  };
  //! Adopt button
  const adopted = (button) => {
    my_modal_1.showModal();
    let counter = 3;
    const countdownNumber = document.getElementById("countdown-number");
    countdownNumber.innerText = counter;
    const countdown = setInterval(() => {
      counter--;
      if (counter < 1) {
        clearInterval(countdown);
        my_modal_1.close();
        button.setAttribute("disabled", true);
        button.classList.add("bg-[#E5E5E5]", "text-[#C6C6C6]");
      } else {
        countdownNumber.innerText = counter;
      }
    }, 1000);
  };
  //! Load pet details
  const loadPetDetails = async (id) => {
    const response = await fetch(
      `https://openapi.programming-hero.com/api/peddy/pet/${id}`
    );
    const data = await response.json();
    const pet = data.petData;
    const div = document.createElement("div");
    div.classList.add("modal-box", "w-3/4", "font-inter", "rounded-lg");
    div.innerHTML = `
                <img src="${pet.image}" alt="" class="w-full mb-5 rounded-xl" />
                <h3 class="text-2xl font-bold mb-3">${
                  pet.pet_name === undefined || pet.pet_name === null
                    ? "N/A"
                    : pet.pet_name
                }</h3>
                <div class="grid grid-cols-1 lg:grid-cols-2 space-y-2">
                 
                  <div class="flex gap-2 items-center">
                    <img src="images/category.svg" alt="" class="w-5"/>Breed : ${
                      pet.breed === undefined || pet.breed === null
                        ? "N/A"
                        : pet.breed
                    }
                  </div>
  
                  <div class="flex gap-2 items-center">
                    <img src="images/calender.svg" alt=""  class="w-5"/>Birth : ${
                      pet.date_of_birth === undefined ||
                      pet.date_of_birth === null
                        ? "N/A"
                        : new Date(pet.date_of_birth).getFullYear()
                    }
                  </div>
  
                  <div class="flex gap-2 items-center">
                    <img src="images/gender.svg" alt=""  class="w-5"/>Gender : ${
                      pet.gender === undefined || pet.gender === null
                        ? "N/A"
                        : pet.gender
                    }
                  </div>
    
                  <div class="flex gap-2 items-center">
                    <img src="images/dollar.svg" alt=""  class="w-5"/>Price :  ${
                      pet.price === undefined || pet.price === null
                        ? "N/A"
                        : pet.price
                    }
                  </div>
  
                  <div class="flex gap-2 items-center">
                    <img src="images/gender.svg" alt=""  class="w-5"/>Vaccinated : ${
                      pet.vaccinated_status === undefined ||
                      pet.vaccinated_status === null
                        ? "N/A"
                        : pet.vaccinated_status
                    }
                  </div>
  
                </div>
  
                <hr class="my-4" />
  
                <div>
                  <h1 class="font-bold text-lg">Details Information</h1>
                  <p class="my-2">
                   ${pet.pet_details}
                  </p>
                  <button
                    class="rounded-xl w-full py-3 text-primary border bg-[#0e7a811a] border-[#0e7a8133] font-semibold mt-4"
                    onclick="my_modal_2.close()"
                  >
                    Cancel
                  </button>
                </div>
              `;
  
    document.getElementById("my_modal_2").appendChild(div);
    my_modal_2.showModal();
  };
  
loadPetDetails();
loadPets();
loadCategory();