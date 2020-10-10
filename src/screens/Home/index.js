import React, {useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  Container,
  Scroller,
  HeaderArea,
  HeaderTitle,
  SearchButton,
  LocationArea,
  LocationInput,
  LocationFinder,

 } from './styled';
import SearchIcon from '../../assets/search.svg';
import MyLocationIcon from '../../assets/my_location.svg';

export default () => {  

  const navigation = useNavigation()
  const [locationText, setLocationText] = useState('');

    return (
      <Container>
        <Scroller>
          <HeaderArea>
            <HeaderTitle numberOfLines={2}>Encontr o seu barbeiro favorito</HeaderTitle>
            <SearchButton onPress={()=>navigation.navigate('Search')}>
            <SearchIcon with="24" height="24" fill="#FFFF" />
            </SearchButton>            
          </HeaderArea>

          <LocationArea>
            <LocationInput 
              placeholder="Onde você esta?"
              placeholderTextColor="#FFFFFF"
              value={locationText}
              onChangeText={t=>setLocationText(t)}
            />
            <LocationFinder>
              <MyLocationIcon with="24" height="24" fill="#FFFFFF" />
            </LocationFinder>
          </LocationArea>
        </Scroller>
      </Container>
    )
  
}

