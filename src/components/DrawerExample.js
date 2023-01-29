import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,

  Select,
  Stack,
} from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../context/GlobalWrapper';
import InputsGroup from './InputsGroup';

export default function DrawerExample() {
  const { onOpen, isOpen, onClose, Add, errors, setErrors, user, Update ,countries } =
    useContext(GlobalContext);
    const [state,setState] = useState([])
  const [form, setForm] = useState({});

  const onChangeHandler = (e) => {
  
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onAdd = () => {
    Add(form, setForm);
  };

  const onUpdate = () => {
    Update(form, setForm, form._id);
  };

  useEffect(() => {
    setForm(user);
  }, [user]);

  // handle country states 
const handleCountryChange=(e)=>{


  
  const selectedCountry =countries.find(country=>country.country_id === e.target.value)
  
  setState(selectedCountry.states)

  setForm({
    ...form,
    [e.target.name]: selectedCountry.country_name,
  });
 

}
// state change

const handleStateChange = (e)=>{

  const selectedState =state.find(st=>st.state_id=== e.target.value)
  setForm({
    ...form,
    [e.target.name]: selectedState.state_name,
  });
}


  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton
            onClick={() => {
              onClose();
              setErrors({});
              setForm({});
            }}
          />
          <DrawerHeader>Create / Update user</DrawerHeader>

          <DrawerBody>
            <Stack spacing={'24px'}>
              <InputsGroup
                name="fullname"
                onChangeHandler={onChangeHandler}
                value={form?.fullname}
                errors={errors?.fullname}
              />
              <InputsGroup
                name="email"
                onChangeHandler={onChangeHandler}
                value={form?.email}
                errors={errors?.email}
              />
              <InputsGroup
                name="age"
                onChangeHandler={onChangeHandler}
                value={form?.age}
                errors={errors?.age}
              />

{/* countries */}

<Select placeholder='Select Country'
                name="country"


onChange={handleCountryChange}

>
{
  countries.map(country=>  <option
     key={country.country_id}
     value={country.country_id}
     name={country.country_name} 
    
  >{country.country_name}</option>)
}
</Select>

{/* select state */}

<Select placeholder='Select state'
name="state"


onChange={handleStateChange}


>
{
  state.map(st=>  <option
     key={st.state_id}
     value={st.state_id} 
     name={st.state_name}
    
  >{st.state_name}</option>)
}
</Select>




            </Stack>
          </DrawerBody> 

          <DrawerFooter>
            <Button
              variant="outline"
              mr={3}
              onClick={() => {
                onClose();
                setErrors({});
                setForm({});
              }}
            >
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              onClick={() => (form._id ? onUpdate() : onAdd())}
            >
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
