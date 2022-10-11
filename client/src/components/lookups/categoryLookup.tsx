import { Autocomplete, TextField } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { MakeRequest } from '../../services/apiService';
import { useBeforeRender } from '../../services/utils';

type IProp = {
  set: React.Dispatch<React.SetStateAction<string>>;
  url: string;
  label: string;
  filter: String;
  labelFromLookup: string;
};

export default function CategoryLookup({
  set,
  url,
  label,
  filter,
  labelFromLookup,
}: IProp) {
  console.log('Category rendered');
  const [visibleValue, setVisibleValue] = React.useState<any | null>({
    label: 'Please Select or search',
  });
  const [inputValue, setInputValue] = React.useState('');
  const [formattedCategory, setFormattedCategory] = useState([]);

  useBeforeRender(async () => {
    console.log('before render');
    try {
      const category = await MakeRequest(url, 'get', null, true);
      console.log('category', category);
      if (category) {
        const formatted: any = category
          .filter((category: any) => {
            return category.categoryFor === filter;
          })
          .map((category: any) => {
            return { label: category[labelFromLookup], id: category._id };
          });
        console.log('formatted', formatted);
        return setFormattedCategory(formatted);
      }
    } catch (error: any) {
      if (error?.response?.data?.error) {
        let errorData = error.response.data.error;
        console.log(errorData);
        return;
      }
    }
  }, []);

  useEffect(() => {
    console.log('After Render');
  }, []);

  console.log('formattedCategory', formattedCategory);

  return (
    <Autocomplete
      value={visibleValue}
      onChange={(event: any, newValue: any) => {
        console.log(`selected ${newValue.id}`);
        setVisibleValue(newValue);
        set(newValue.id);
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue: any) => {
        setInputValue(newInputValue);
      }}
      disablePortal
      id="category"
      options={formattedCategory}
      sx={{ width: '100% ', marginBottom: '1rem' }}
      renderInput={(params) => (
        <>
          <div style={{ display: '' }}>
            <div>{`value: ${
              visibleValue !== null
                ? `'${JSON.stringify(visibleValue)}'`
                : 'null'
            }`}</div>
            <div>{`inputValue: '${inputValue}'`}</div>
          </div>
          <TextField {...params} label={label} />
        </>
      )}
    />
  );
}
