import React, { useState } from 'react';
import Select from 'react-select';

const MultiSelectDropdown = ({setSelectedCategories}) => {
  const categoriesOptions = [
    // { value: 'all', label: 'All' },
    { value: 'rent_and_utilities', label: 'Rent' },
    { value: 'investing', label: 'Investing' },
    { value: 'grocery', label: 'Grocery' },
    { value: 'gas', label: 'Gas' },
    { value: 'dining', label: 'Dining' },
    { value: 'car', label: 'Car' },
    { value: 'social', label: 'Social' },
    { value: 'education', label: 'Education' },
    { value: 'health', label: 'Health' },
    { value: 'transportation', label: 'Transportation' },
    { value: 'travel', label: 'Travel' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'insurance', label: 'Insurance' },
    { value: 'style', label: 'Style' },
    { value: 'other', label: 'Other' },
  ];


  const changeHandler = (values)=>{
    setSelectedCategories(values);
  }
  
  return (
    <Select 
      options = {categoriesOptions}
      isMulti
      name="categories"
      className='basic-multi-select'
      classNamePrefix="select"
      onChange={changeHandler}
      placeholder="Choose categories"
    />
  )

}

export default MultiSelectDropdown;


