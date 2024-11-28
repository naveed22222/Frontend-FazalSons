

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddSubCat.css';
import Select from 'react-select';

const AddSubCat = () => {
  const [formData, setFormData] = useState({
    headCategory: '',
    parentCategory: '',
    category_name: "",
    sub_category_name: '',
    symbol: '',
    description: '',
    //pc_name: "", // This stores the Parent Category ID
    status: 'active',
    attType: [],
    attribute_group: [],
    attribute_id : '',
  });

  const [headCategories, setHeadCategories] = useState([]);
  const [parentCategories, setParentCategories] = useState([]);
  const [attTypes, setAttTypes] = useState([]);
  const [variationsGroup, setVariationsGroup] = useState([]);
  const [categories, setCategories] = useState([]); // To store added categories
  const [subcategories, setsubCategories] = useState([]); // To store added categories
  const [message, setMessage] = useState('');
  const [editMode, setEditMode] = useState(false); // To track if we are editing an existing category
  const [editCategoryId, setEditCategoryId] = useState(null); // Store category id being edited
  
  const [tableData, setTableData] = useState([]); // For table rows
  const [id, setId] = useState(1); // Tracks the dynamic ID, default set to 1
  const [selectedGroup, setSelectedGroup] = useState([]);
  const [selectedAttributeType, setSelectedAttributeType] = useState(null);
  const [selectedAttributeId, setSelectedAttributeId] = useState(null);
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [selectedParentCategory, setSelectedParentCategory] = useState('');
  const [selectedHeadCategory, setSelectedHeadCategory] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');



  const API_ADD_SUBCATEGORIES = 'http://16.171.145.107/pos/products/add_subcategories';
  const API_HEAD_CATEGORIES = 'http://16.171.145.107/pos/products/add_head_category';
  const API_PARENT_CATEGORIES = 'http://16.171.145.107/pos/products/add_parent_category';
  const API_ATT_TYPES = 'http://16.171.145.107/pos/products/add_attribute_type';
  const API_FETCH_VARIATIONS_GROUP = 'http://16.171.145.107/pos/products/fetch_variations_group';

  const API_UPDATE_SUBCATEGORY = 'http://16.171.145.107/pos/products/action_subcategories';
  const API_FETCH_CATEGORIES = 'http://16.171.145.107/pos/products/add_categories';

  // Fetch initial data and categories list
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [headResponse, parentResponse, attTypesResponse, categoriesResponse] = await Promise.all([
          axios.get(API_HEAD_CATEGORIES),
          axios.get(API_PARENT_CATEGORIES),
          axios.get(API_ATT_TYPES),
          axios.get(API_FETCH_CATEGORIES),
        ]);
    
        setHeadCategories(headResponse.data);
        setParentCategories(parentResponse.data);
        setAttTypes(attTypesResponse.data);
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error("Error in fetchInitialData:", error);
    
        // Log each endpoint individually
        try {
          const headResponse = await axios.get(API_HEAD_CATEGORIES);
          setHeadCategories(headResponse.data);
        } catch (headError) {
          console.error("Error fetching Head Categories:", headError);
        }
    
        try {
          const parentResponse = await axios.get(API_PARENT_CATEGORIES);
          setParentCategories(parentResponse.data);
        } catch (parentError) {
          console.error("Error fetching Parent Categories:", parentError);
        }
    
        try {
          const attTypesResponse = await axios.get(API_ATT_TYPES);
          setAttTypes(attTypesResponse.data);
        } catch (attError) {
          console.error("Error fetching Attribute Types:", attError);
        }
    
        try {
          const categoriesResponse = await axios.get(API_FETCH_CATEGORIES);
          setCategories(categoriesResponse.data);
        } catch (categoriesError) {
          console.error("Error fetching Categories:", categoriesError);
        }

        
    
        
      }
    };
    

    fetchInitialData();
  }, []);

  // Fetch Attribute Types
  useEffect(() => {
    const fetchAttTypes = async () => {
      try {
        const response = await axios.get(API_ATT_TYPES);
        setAttTypes(response.data);
      } catch (error) {
        console.error('Error fetching Attribute Types:', error);
      }
    };
    fetchAttTypes();
  }, []);


  
useEffect(() => {
  fetchHeadCategories();
}, []);

// Fetch Head Categories
const fetchHeadCategories = async () => {
  try {
    const response = await axios.get('http://16.171.145.107/pos/products/add_head_category');
    setHeadCategories(response.data);
  } catch (error) {
    console.error('Error fetching head categories:', error);
    //setError('Failed to load head categories. Please try again later.');
  }
  
}; 

const handleHeadCategoryChange = async (e) => {
  const headCategoryId = e.target.value; // This will now hold the numeric ID
  console.log('Selected Head Category ID:', headCategoryId); // Logs the correct ID

  setSelectedHeadCategory(headCategoryId); // Save selected head category

  // Update formData with selected head category ID
  setFormData({
    ...formData,
    headCategory: headCategoryId,
  });


  // Reset dependent dropdowns
  setParentCategories([]);
  setCategories([]);
  setSelectedParentCategory('');


  if (headCategoryId) {
    try {
      const response = await axios.get(
        `http://16.171.145.107/pos/products/fetch_head_to_parent_category/${headCategoryId}/`
      );
      console.log('Parent Categories:', response.data);
      setParentCategories(response.data); // Populate parent categories
    } catch (error) {
      console.error(
        `Error fetching parent categories for Head Category ID: ${headCategoryId}`,
        error
      );
      // Optional: Display error message to user
    }
  }
};



const handleParentCategoryChange = async (e) => { 
    const parentCategoryId = e.target.value; // Get the selected parent category ID
    console.log('Selected Parent Category ID:', parentCategoryId); // Log for debugging
  
    setSelectedParentCategory(parentCategoryId); // Save the selected parent category in state
  
    // Update formData with the selected parent category ID
    setFormData({
      ...formData,
      parentCategory: parentCategoryId,
    });
  
    // Reset dependent dropdowns
    
    
    setSelectedParentCategory('');
    setCategories([]);
    
    setSelectedCategory(''); // Reset any previously selected category
  
    if (parentCategoryId) {
      try {
        // Fetch categories based on parent category
        const response = await axios.get(
          `http://16.171.145.107/pos/products/fetch_parent_to_category/${parentCategoryId}/`
        );
        console.log('Categories:', response.data); // Log fetched categories
        setCategories(response.data); // Populate the categories dropdown
      } catch (error) {
        console.error(
          `Error fetching categories for Parent Category ID: ${parentCategoryId}`,
          error
        );
        // Optional: Display an error message to the user
      }
    }
  };
  
  
  
// Fetch Groups Based on Selected Attribute Types
// useEffect(() => {
//   if (formData.attType.length > 0) {
//     const fetchGroups = async () => {
//       try {
//         const responses = await Promise.all(
//           formData.attType.map((typeId) =>
//             axios.get(`${API_FETCH_VARIATIONS_GROUP}/${typeId}`)
//           )
//         );

//         const data = responses.flatMap((res) => res.data);
//         setTableData(data);
//       } catch (error) {
//         console.error('Error fetching groups:', error);
//       }
//     };
//     fetchGroups();
//   } else {
//     setTableData([]);
//   }
// }, [formData.attType]);


const handleRadioChange = (groupName) => {
  setSelectedGroup(groupName);
  console.log("Selected Group:", groupName); // Debugging log
};

  
// Fetch Groups Based on Selected Attribute Types
useEffect(() => {
  if (formData.attType.length > 0) {
    const fetchGroups = async () => {
      try {
        const responses = await Promise.all(
          formData.attType.map((typeId) =>
            axios.get(`${API_FETCH_VARIATIONS_GROUP}/${typeId}`)
          )
        );

        const data = responses.flatMap((res) => res.data);
        setTableData(data);
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };
    fetchGroups();
  } else {
    setTableData([]);
  }
}, [formData.attType]);

  // Handle Multi-select Attribute Type Change
  const handleMultiSelectChange = (selectedOption) => {
    const selectedIds = selectedOption ? selectedOption.map((option) => option.value) : [];
    setFormData((prevState) => ({
      ...prevState,
      attType: selectedIds,
    }));
    setSelectedGroup([]); // Reset selected groups when attribute types change
  };

const handleGroupSelection = (attType, attributeName, attributeId, event) => {
  const { value, checked } = event.target;

  // Update selectedGroup for the current att_type
  setSelectedGroup((prevState) => ({
    ...prevState,
    [attType]: attributeId,
  }));

  // Update formData with the selected attribute_id and attribute_name
  setFormData((prevState) => ({
    ...prevState,
    attribute_id: attributeId,
    attribute_name: attributeName,
  }));

  // Manage selectedAttributes array
  setSelectedAttributes((prevState) => {
    // Filter out previous entries with the same att_type
    const filteredAttributes = prevState.filter(
      (attr) => !attr.startsWith(attType)
    );

    if (checked) {
      // Add the new selection for the current att_type
      return [...filteredAttributes, `${attType}:${value}`];
    }
    return filteredAttributes; // If unchecked, just return filtered array
  });

  console.log("selectedGroup", selectedGroup);
  console.log("selectedAttributes", selectedAttributes);
};

  
  

const handleInputChange = (e) => {
  const { name, value, type, checked } = e.target;

  console.log(name, value, type);

  setFormData((prevFormData) => ({
    ...prevFormData,
    [name]:
      type === "checkbox"   // If it's a checkbox, set the value based on its checked state
        ? checked
        : name === "category_name" // Handle the special case for `pc_name`
        ? value || null      // Store `null` if no value is provided
        : value,             // Default behavior for other inputs
  }));
};

  
  
  
  
  


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const attributeGroup = Array.isArray(formData.attribute_name)
      ? formData.attribute_name
      : formData.attribute_name
          .split(',')
          .map((item) => item.trim());
  
    const payload = {
      //category_name: formData.category_name,
    sub_category_name: formData.sub_category_name,
    symbol: formData.symbol,
    description: formData.description,
    status: formData.status,
    //pc_name: formData.pc_name ? parseInt(formData.pc_name, 10) : null,
    category: formData.category_name ? parseInt(formData.category_name, 10) : null,
    attribute_group: selectedAttributes.map((attr) => attr.split(":")[1]), // Extract only the attribute_id
    };
    console.log(payload);
  
    try {
      if (editMode) {
        // PUT request to update category
        const response = await axios.put(`${API_UPDATE_SUBCATEGORY}/${editCategoryId}`, payload);
  
        // Update the category list with the new data
        const updatedCategories = categories.map((cat) =>
          cat.id === editCategoryId ? response.data : cat
        );
        setsubCategories(updatedCategories);
        setTableData(updatedCategories);
  
        setMessage("Sub Category updated successfully.");
      } else {
        // POST request to add new subcategory
        const response = await axios.post(API_ADD_SUBCATEGORIES, payload);
        const newCategory = response.data;
        setsubCategories((prevCategories) => [...prevCategories, newCategory]);
        setTableData((prevData) => [...prevData, newCategory]);
        setMessage("Category added successfully.");
      }

      // Reset form and exit edit mode
      setFormData({
        headCategory: '',
        parentCategory: '',
        category_name: "",
        sub_category_name: '',
        symbol: '',
        description: '',
        addSubCategory: false,
        status: 'active',
        attType: [],
        // attribute_name: " ",
        //  attribute_id : null,
      });
      setEditMode(false);
      setEditCategoryId(null);
    } catch (error) {
      console.error('Error submitting category:', error);
      setMessage('Failed to submit category. Please try again.');
    }
  };
  
  const handleEdit = async (subcategory) => {
    try {
      // Fetch category details from API
      const response = await axios.get(`${API_UPDATE_SUBCATEGORY}/${subcategory.id}`);
      const subcategoryData = response.data;
  console.log(subcategoryData)
      // Pre-fill form fields
      setFormData({
        headCategory: '', // Update if necessary
        category: subcategoryData.category ? subcategoryData.category.toString() : '',
        symbol: subcategoryData.symbol || '',
        addSubCategory: subcategoryData.subcategory_option === "True",
        description: subcategoryData.description || '',
        status: subcategoryData.status || 'active',
        //pc_name: categoryData.pc_name ? categoryData.pc_name.toString() : '',
        attribute_group: subcategoryData.attribute_group || [], // Array of selected attributes
      });
  
      // Pre-fill table's selected attributes
      const initialSelectedGroup = {};
      subcategoryData.attribute_group.forEach((group) => {
        initialSelectedGroup[group] = group; // Populate based on `group` logic
      });
      setSelectedGroup(initialSelectedGroup);
  
      setEditMode(true);
      setEditCategoryId(subcategoryData.id); // Store the ID for updating
    } catch (error) {
      console.error('Error fetching category for edit:', error);
      setMessage('Failed to fetch category details.');
    }
  };
  
  
  const handleDelete = async (subcategoryId) => {
    try {
      await axios.delete(`${API_UPDATE_SUBCATEGORY}/${subcategoryId}`);
      setsubCategories(subcategories.filter((subcategory) => subcategory.id !== subcategoryId));
      setMessage("Category deleted successfully.");
    } catch (error) {
      console.error('Error deleting category:', error);
      setMessage('Failed to delete category.');
    }
  };

 


  

  return (
    <div className="form-container">
      <h2 className="form-title">Add Sub-Categories</h2>
      {message && <p className="form-message">{message}</p>}
      <form className="form" onSubmit={handleSubmit}>
        {/* Head Category Dropdown */}
        <div className="form-group">
          <label>Head Category:</label>
          <select
            name="headCategory"
            value={formData.headCategory}
            onChange={handleHeadCategoryChange}
            className="form-select"
          >
            <option value="">Select</option>
            {headCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.hc_name}
              </option>
            ))}
          </select>
        </div>

        {/* Parent Category Dropdown */}
        <div className="form-group">
  <label>Parent Category:</label>
  <select
    name="pc_name"
    value={formData.selectedParentCategory}
    onChange={handleParentCategoryChange}
    className="form-select"
  > 

    <option value="">Select Parent Category</option>  {/* Default option */}
    {parentCategories.map((category) => (
      
      <option key={category.id} value={category.id}>
        {category.pc_name}
      </option>
     
    ))}
  </select>

</div>

<div className="form-group">
  <label>Category:</label>
  <select
    name="category_name"
    value={formData.selectedCategory}
    onChange={(e) => {
      const selectedOptionId = e.target.value; // Get the ID of the selected option
      console.log({selectedOptionId})
      setFormData({
        ...formData,
        category_name: selectedOptionId,  // Store the selected ID instead of the name
      });
      //console.log(category_name)

      
    }}
    className="form-select"
  > 

    <option value="">Select Category</option>  {/* Default option */}
    {categories.map((category) => (
      
      <option key={category.id} value={category.id}>
        {category.category_name}
      </option>
     
    ))}
  </select>
  </div>




        {/* SubCategory Name */}
        <div className="form-group">
          <label>Sub Category Name:</label>
          <input
            type="text"
            name="sub_category_name"
            value={formData.sub_category_name}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>

        {/* Short Form */}
        <div className="form-group">
          <label>Short Form:</label>
          <input
            type="text"
            name="symbol"
            value={formData.symbol}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>

        {/* Description */}
        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="form-textarea"
          />
        </div>


        {/* Status Radio Buttons */}
        <div className="form-group">
          <label>Status:</label>
          <div>
            <label>
              <input
                type="radio"
                name="status"
                value="active"
                checked={formData.status === 'active'}
                onChange={handleInputChange}
              />
              Active
            </label>
            <label>
              <input
                type="radio"
                name="status"
                value="inactive"
                checked={formData.status === 'inactive'}
                onChange={handleInputChange}
              />
              Inactive
            </label>
            <label>
              <input
                type="radio"
                name="status"
                value="pending"
                checked={formData.status === 'pending'}
                onChange={handleInputChange}
              />
              Pending
            </label>
          </div>
        </div>
        {/* Conditional Rendering for Attribute Types and Table */}

<div>
          <label>Attribute Types</label>
          <Select
            isMulti
            options={attTypes.map((type) => ({ value: type.id, label: type.att_type }))}
            onChange={handleMultiSelectChange}
          />
        </div>
<div>
      {/* Table for Attributes */}
      <table
        border="1"
        style={{
          borderCollapse: "collapse",
          width: "100%",
          marginTop: "20px",
          border: "1px solid black",
        }}
      >
        <thead>
          {/* Conditionally render headers based on selection */}
          {selectedAttributeType && (
            <tr>
              <th style={{ border: "1px solid black" }}>#</th>
              <th style={{ border: "1px solid black" }}>Attribute Type</th>
              <th style={{ border: "1px solid black" }}>
                Attribute Group
              </th>
              <th style={{ border: "1px solid black" }}>Variations</th>
            </tr>
          )}
        </thead>
       
        <tbody>
  {Object.values(
    tableData.reduce((acc, item) => {
      if (!acc[item.att_type]) {
        acc[item.att_type] = { ...item, groups: [] };
      }
      acc[item.att_type].groups.push(item);
      return acc;
    }, {})
  ).map((typeGroup, groupIndex) =>
    typeGroup.groups.map((item, index) => (
      <tr
        key={`${item.att_id}-${index}`}
        style={{ borderBottom: "1px solid black" }}
      >
        {/* Row Number Column */}
        {index === 0 && (
          <td
            style={{
              border: "1px solid black",
              textAlign: "center",
              verticalAlign: "middle",
            }}
            rowSpan={typeGroup.groups.length}
          >
            {groupIndex + 1}
          </td>
        )}

        {/* Attribute Type Column */}
        {index === 0 && (
          <td
            style={{
              border: "1px solid black",
              textAlign: "center",
              verticalAlign: "middle",
            }}
            rowSpan={typeGroup.groups.length}
          >
            {item.att_type}
          </td>
        )}

        {/* Attribute Name Column */}
        <td style={{ border: "1px solid black", textAlign: "center" }}>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            <input
              type="radio"
              name={item.att_type}
              value={item.attribute_id}
              checked={selectedGroup[item.att_type] === item.attribute_id}
              onChange={(e) =>
                handleGroupSelection(item.att_type, item.attribute_name, item.attribute_id, e)
              } 
            
            />
            {item.attribute_name}
          </label>
        </td>

        {/* Variations Column */}
        <td style={{ border: "1px solid black", textAlign: "center" }}>
          {item.variation && item.variation.length > 0 ? (
            <ul
              style={{
                listStyleType: "none",
                margin: 0,
                padding: 0,
                textAlign: "left",
              }}
            >
              {item.variation.map((varName, varIndex) => (
                <li key={varIndex}>{varName}</li>
              ))}
            </ul>
          ) : (
            "No Variations"
          )}
        </td>
      </tr>
    ))
  )}
</tbody>
      </table>
    </div>
    

    

        {/* Submit Button */}
        <div className="form-group">
          <button type="submit" className="submit-button">
            {editMode ? "Update SubCategory" : "Add SubCategory"}
          </button>
        </div>
      </form>

      {/* Categories Table */}
      <div className="form-group">
        <h3>Sub Categories List</h3>
        <table className="categories-table">
        <thead>
          <tr>
            <th>SubCategory Name</th>
            <th>Short Form</th>
            <th>Status</th>
            <th>Attribute Group</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {subcategories.map((subcategory, index) => (
            <tr key={subcategory.id || index}>
              <td>{subcategory.sub_category_name}</td>
              <td>{subcategory.symbol}</td>
              <td>{subcategory.status}</td>
              <td>
  {Array.isArray(subcategory.attribute_group)
    ? subcategory.attribute_group.join(', ')  // If it's an array, join with commas
    : subcategory.attribute_group && subcategory.attribute_group.split
    ? subcategory.attribute_group.split(' ').join(', ')  // If it's a string, split and join
    : "No groups available"}  
</td>

              <td>
                <button 
                  type="button" 
                  className="btn-edit"
                  onClick={() => handleEdit(subcategory)}>
                  Edit 
                </button>
                <button 
                  className="btn-delete"
                  onClick={() => handleDelete(subcategory.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      </div>
    </div>
  );
};

export default AddSubCat;