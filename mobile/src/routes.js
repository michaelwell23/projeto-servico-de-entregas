/* eslint-disable react/prop-types */
import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import { Text, View } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from '~/pages/SignIn';

import Deliveries from '~/pages/Deliveries';

import Details from '~/pages/DeliveryDetails/Details';
import ShowProblems from '~/pages/DeliveryDetails/ShowProblems';
import RegisterProblem from '~/pages/DeliveryDetails/RegisterProblem';
import ConfirmDelivery from '~/pages/DeliveryDetails/ConfirmDelivery';

import Profile from '~/pages/Profile';

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        SignIn,
        App: createBottomTabNavigator(
          {
            Dashboard: createStackNavigator(
              {
                Deliveries: {
                  screen: Deliveries,
                  navigationOptions: {
                    headerShown: false,
                  },
                },
                Details: {
                  screen: Details,
                  navigationOptions: {
                    headerTitle: 'Detalhes da encomenda',
                    headerBackTitleVisible: false,
                    headerTransparent: true,
                    headerTitleStyle: { fontWeight: 'bold' },
                    headerTintColor: '#fff',
                    headerLeftContainerStyle: {
                      left: 10,
                    },
                  },
                },
                RegisterProblem: {
                  screen: RegisterProblem,
                  navigationOptions: {
                    headerTitle: 'Informar problema',
                    headerBackTitleVisible: false,
                    headerTransparent: true,
                    headerTitleStyle: { fontWeight: 'bold' },
                    headerTintColor: '#fff',
                    headerLeftContainerStyle: {
                      left: 10,
                    },
                  },
                },
                ShowProblems: {
                  screen: ShowProblems,
                  navigationOptions: {
                    headerTitle: 'Visualizar problemas',
                    headerBackTitleVisible: false,
                    headerTransparent: true,
                    headerTitleStyle: { fontWeight: 'bold' },
                    headerTintColor: '#fff',
                    headerLeftContainerStyle: {
                      left: 10,
                    },
                  },
                },
                ConfirmDelivery: {
                  screen: ConfirmDelivery,
                  navigationOptions: {
                    headerTitle: 'Confirmar entrega',
                    headerBackTitleVisible: false,
                    headerTransparent: true,
                    headerTitleStyle: { fontWeight: 'bold' },
                    headerTintColor: '#fff',
                    headerLeftContainerStyle: {
                      left: 10,
                    },
                  },
                },
              },
              {
                navigationOptions: {
                  tabBarLabel: ({ tintColor }) => (
                    <View
                      style={{
                        marginBottom: 10,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          color: tintColor,
                          textAlign: 'center',
                        }}
                      >
                        Entrega
                      </Text>
                    </View>
                  ),
                  tabBarIcon: ({ tintColor }) => (
                    <Icon name="reorder" size={24} color={tintColor} />
                  ),
                },
              }
            ),
            Profile: {
              screen: Profile,
              navigationOptions: {
                tabBarLabel: ({ tintColor }) => (
                  <View style={{ marginBottom: 10 }}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: tintColor,
                        textAlign: 'center',
                      }}
                    >
                      Meu Perfil
                    </Text>
                  </View>
                ),
                tabBarIcon: ({ tintColor }) => (
                  <Icon name="account-circle" size={24} color={tintColor} />
                ),
              },
            },
          },
          {
            resetOnBlur: true,
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#dc134c',
              inactiveTintColor: '#999',
              style: {
                backgroundColor: '#fff',
                height: 70,
              },
            },
          }
        ),
      },
      {
        initialRouteName: signedIn ? 'App' : 'SignIn',
      }
    )
  );
