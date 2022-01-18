/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-unstable-nested-components */
import React, { useState, useEffect } from 'react';
import {
  View, Text, Pressable, FlatList, LogBox,
} from 'react-native';
import CurrencyInput from 'react-native-currency-input';

import CountryFlag from 'react-native-country-flag';
import { FontAwesome5 } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { getISOByParam } from '../scraper/isoCountryCurrency';
import { getAvailableFromCountry, getExchangeRates } from '../scraper/converter';
import currencyNames from '../data/currenciesName.json';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

function ConverterHome({ navigation }) {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('MYR');
  const [fromValue, setFromValue] = useState(0);
  const [toValue, setToValue] = useState(0);
  const [exchangeRates, setExchangeRates] = useState([]);

  useEffect(() => {
    getExchangeRates(fromCurrency).then((data) => {
      setExchangeRates(data);
    }).catch((e) => { throw e; });
  }, [fromCurrency]);

  useEffect(() => {
    setToValue(fromValue * (exchangeRates[toCurrency] || 1));
  }, [toCurrency, fromValue, exchangeRates]);

  return (
    <View style={{ padding: 16, paddingTop: 12 }}>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
        paddingBottom: 8,
        overflow: 'visible',
      }}
      >
        <View style={{
          borderRadius: 6,
          overflow: 'hidden',
        }}
        >
          <Pressable
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 16,
              paddingVertical: 8,
              overflow: 'hidden',
              borderRadius: 6,
            }}
            onPress={() => navigation.navigate(
              'CurrencyChooser',
              { currentSelected: fromCurrency, setCurrentSelected: setFromCurrency },
            )}
            android_ripple={{ color: '#CBD5E1' }}
          >
            <CountryFlag
              isoCode={getISOByParam('currency', fromCurrency)}
              size={20}
              style={{
                borderRadius: 3,
              }}
            />
            <Text style={{
              marginLeft: 8,
              fontSize: 12,
              width: 60,
            }}
            >
              {fromCurrency}
            </Text>
            <FontAwesome5 name="sort-down" size={16} style={{ marginTop: -6 }} />
          </Pressable>
        </View>
        <Pressable
          style={{
            padding: 8,
          }}
          onPress={() => {
            const tempFrom = fromCurrency;
            setFromCurrency(toCurrency);
            setToCurrency(tempFrom);
          }}
        >
          <FontAwesome5 name="exchange-alt" size={18} color="#334155" />
        </Pressable>
        <View style={{
          borderRadius: 6,
          overflow: 'hidden',
        }}
        >
          <Pressable
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 16,
              paddingVertical: 8,
              overflow: 'hidden',
              borderRadius: 6,
            }}
            onPress={() => navigation.navigate(
              'CurrencyChooser',
              { currentSelected: toCurrency, setCurrentSelected: setToCurrency },
            )}
            android_ripple={{ color: '#CBD5E1' }}
          >
            <CountryFlag
              isoCode={getISOByParam('currency', toCurrency)}
              size={20}
              style={{
                borderRadius: 3,
              }}
            />
            <Text style={{
              marginLeft: 8,
              fontSize: 12,
              width: 60,
            }}
            >
              {toCurrency}
            </Text>
            <FontAwesome5 name="sort-down" size={16} style={{ marginTop: -6 }} />
          </Pressable>
        </View>
      </View>
      <Text style={{
        marginTop: 12,
        fontSize: 12,
        color: '#94A3B8',
      }}
      >
        From currency
      </Text>
      <CurrencyInput
        style={{
          backgroundColor: 'white',
          padding: 12,
          borderRadius: 6,
          borderWidth: 1,
          borderColor: '#F1F5F9',
          marginTop: 6,
          fontSize: 24,
          color: '#334155',
        }}
        prefix={currencyNames.filter((e) => e.cc === fromCurrency)[0]?.symbol}
        value={fromValue}
        onChangeValue={setFromValue}
        delimiter=","
        separator="."
        precision={2}
        onChangeText={() => {
          if (!fromValue) {
            setFromValue(0);
          }
        }}
        minValue={0}
      />
      <Text style={{
        marginTop: 12,
        fontSize: 12,
        color: '#94A3B8',
      }}
      >
        To currency
      </Text>
      <Text style={{
        backgroundColor: 'white',
        padding: 12,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#F1F5F9',
        marginTop: 6,
        fontSize: 24,
        color: '#334155',
      }}
      >
        {currencyNames.filter((e) => e.cc === toCurrency)[0]?.symbol}
        {toValue.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      </Text>
    </View>
  );
}

function CurrencyChooser({ navigation, ...props }) {
  const [availableToCurrency, setAvailableToCurrency] = useState([]);

  useEffect(() => {
    getAvailableFromCountry().then((res) => {
      const data = res.filter((e) => getISOByParam('currency', e)).map((e) => ({
        label: e,
        value: e,
        icon: <CountryFlag
          isoCode={getISOByParam('currency', e)}
          size={50}
          style={{
            borderRadius: 3,
          }}
        />,
      }));
      setAvailableToCurrency(data);
    });
  }, []);

  return (
    <View style={{ padding: 16, paddingTop: 12, flex: 1 }}>
      <Text style={{ fontSize: 16, color: '#334155' }}>Select a currency</Text>
      <View style={{
        flex: 0.99,
      }}
      >
        <FlatList
          style={{
            marginTop: 12,
            marginBottom: 12,
          }}
          data={availableToCurrency}
          keyExtractor={(item) => item.label}
          renderItem={({ item }) => (
            <Pressable
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingVertical: 8,
              }}
              onPress={() => {
                props.route.params.setCurrentSelected(item.label);
                navigation.goBack();
              }}
              android_ripple={{ color: '#CBD5E1' }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                {item.icon}
                <View style={{
                  marginLeft: 12,
                }}
                >
                  <Text style={{
                    fontSize: 14,
                    fontWeight: 'bold',
                    color: '#334155',
                  }}
                  >
                    {item.label}
                  </Text>
                  <Text
                    style={{
                      color: '#94A3B8',
                      fontSize: 12,
                      width: 200,
                    }}
                    numberOfLines={1}
                  >
                    {currencyNames.filter((e) => e.cc === item.label)[0]?.name}
                  </Text>
                </View>
              </View>
              {props.route.params.currentSelected === item.label && <FontAwesome5 name="check" size={16} style={{ marginRight: 8 }} color="#334155" />}
            </Pressable>
          )}
        />
      </View>
      <Pressable
        onPress={() => navigation.goBack()}
        style={{
          backgroundColor: '#0EA5E9',
          padding: 12,
          borderRadius: 6,
        }}
      >
        <Text style={{
          textAlign: 'center',
          color: 'white',
        }}
        >
          CANCEL
        </Text>
      </Pressable>
    </View>
  );
}

const Stack = createStackNavigator();

export default function Converter() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, presentation: 'modal' }}>
      <Stack.Group>
        <Stack.Screen name="Home" component={ConverterHome} />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="CurrencyChooser" component={CurrencyChooser} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
