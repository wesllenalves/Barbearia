import React from 'react'
import styled from 'styled-components/native';

import {useSelector} from 'react-redux';
import HomeIcon from '../../assets/home.svg';
import SearchIcon from '../../assets/search.svg';
import TodayIcon from '../../assets/today.svg';
import FavoriyeIcon from '../../assets/favorite.svg';
import AccountIcon from '../../assets/account.svg';


const TabArea = styled.View`
  height: 60px;
  background-color: #4EADBE;
  flex-direction: row;
`;

const TabItem = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const TabItemCenter = styled.TouchableOpacity`  
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 70px;
  background-color: #FFF;
  border-radius: 35px;
  border: 3px solid #4EADBE;
  margin-top: -30px;
`;

const AvatarIcon = styled.Image`
  width: 24px;
  height: 24px;
  border-radius: 12px;
`;

export default ({state, navigation})  => {

  const {dados} = useSelector((state) => state.user);

  const goTo = (screenName) => {
    navigation.navigate(screenName);
  }

  return (
    <TabArea>
      <TabItem onPress={() => goTo('Home')}>
          <HomeIcon style={{ opacity: state.index===0 ? 1 : 0.5}} width="24" height="24" fill="#FFFFFF" />
      </TabItem>
      <TabItem onPress={() => goTo('Search')}>
          <SearchIcon style={{ opacity: state.index===1 ? 1 : 0.5}} width="24" height="24" fill="#FFFFFF" />
      </TabItem>
      <TabItemCenter onPress={() => goTo('Appointments')}>
          <TodayIcon  width="32" height="32" fill="#4EADBE" />
      </TabItemCenter>
      <TabItem onPress={() => goTo('Favorites')}>
          <FavoriyeIcon style={{ opacity: state.index===3 ? 1 : 0.5}} width="24" height="24" fill="#FFFFFF" />
      </TabItem>
      <TabItem onPress={() => goTo('Profile')}>      
          {dados.avatar != '' 
            ?
            <AvatarIcon source={{uri: dados.avatar}} /> 
            : 
            <AccountIcon style={{ opacity: state.index===4 ? 1 : 0.5}} width="24" height="24" fill="#FFFFFF" />

          }          
      </TabItem>      
    </TabArea>
  )
}
