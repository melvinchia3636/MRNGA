/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import CurrencyInput from 'react-native-currency-input';

import CountryFlag from 'react-native-country-flag';
import { FontAwesome5 } from '@expo/vector-icons';
import { getISOByParam } from '../scraper/isoCountryCurrency';
import { getAvailableFromCountry } from '../scraper/converter';

export default function Converter() {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('MYR');
  const [fromCurrencyChooserOpen, setFromCurrencyChooserOpen] = useState(false);
  const [toCurrencyChooserOpen, setToCurrencyChooserOpen] = useState(false);
  const [availableToCurrency, setAvailableToCurrency] = useState([]);
  const [fromValue, setFromValue] = useState(0);

  useEffect(() => {
    getAvailableFromCountry().then((res) => {
      const data = res.filter((e) => getISOByParam('currency', e)).map((e) => ({
        label: e,
        value: e,
        icon: () => (
          <CountryFlag
            isoCode={getISOByParam('currency', e)}
            size={20}
            style={{
              borderRadius: 3,
            }}
          />
        ),
      }));
      setAvailableToCurrency(data);
    });
  }, []);

  return (
    <View style={{ padding: 16, paddingTop: 12 }}>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
        paddingBottom: 8,
      }}
      >
        <DropDownPicker
          open={fromCurrencyChooserOpen}
          value={fromCurrency}
          items={availableToCurrency}
          setOpen={setFromCurrencyChooserOpen}
          setValue={setFromCurrency}
          setItems={setAvailableToCurrency}
          ArrowDownIconComponent={() => <FontAwesome5 name="sort-down" size={16} style={{ marginTop: -6 }} />}
          ArrowUpIconComponent={() => <FontAwesome5 name="sort-up" size={16} style={{ marginTop: 6 }} />}
          style={{
            borderRadius: 6,
            borderWidth: 0,
            backgroundColor: 'transparent',
          }}
          containerStyle={{
            width: 150,
          }}
          textStyle={{
            color: '#334155',
            fontWeight: 'normal',
            fontSize: 12,
          }}
          dropDownContainerStyle={{
            borderColor: '#F1F5F9',
            padding: 8,
          }}
        />
        <FontAwesome5 name="exchange-alt" size={18} color="#334155" />
        <DropDownPicker
          open={toCurrencyChooserOpen}
          value={toCurrency}
          items={availableToCurrency}
          setOpen={setToCurrencyChooserOpen}
          setValue={setToCurrency}
          setItems={setAvailableToCurrency}
          placeholder="Select a currency"
          ArrowDownIconComponent={() => <FontAwesome5 name="sort-down" size={16} style={{ marginTop: -6 }} />}
          ArrowUpIconComponent={() => <FontAwesome5 name="sort-up" size={16} style={{ marginTop: 6 }} />}
          style={{
            borderRadius: 6,
            borderWidth: 0,
            backgroundColor: 'transparent',
          }}
          containerStyle={{
            width: 150,
          }}
          textStyle={{
            color: '#334155',
            fontWeight: 'normal',
            fontSize: 12,
          }}
          dropDownContainerStyle={{
            borderColor: '#F1F5F9',
            padding: 8,
          }}
        />
      </View>
      <Text style={{
        marginTop: 12,
        fontSize: 12,
        color: '#94A3B8',
      }}
      >
        From currency
      </Text>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
      }}
      >
        <Text style={{
          fontSize: 24,
          marginRight: 12,
          color: '#94A3B8',
        }}
        >
          $
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
            flex: 1,
            color: '#334155',
          }}
          value={fromValue}
          onChangeValue={setFromValue}
          delimiter=","
          separator="."
          precision={2}
          onChangeText={(formattedValue) => {
            if (!fromValue) {
              setFromValue(0);
            }
          }}
          minValue={0}
        />
      </View>
      <Text style={{
        marginTop: 12,
        fontSize: 12,
        color: '#94A3B8',
      }}
      >
        To currency
      </Text>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
      }}
      >
        <Text style={{
          fontSize: 24,
          marginRight: 12,
          color: '#94A3B8',
        }}
        >
          MYR
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
            flex: 1,
            color: '#334155',
          }}
          value={fromValue}
          onChangeValue={setFromValue}
          delimiter=","
          separator="."
          precision={2}
          onChangeText={(formattedValue) => {
            if (!fromValue) {
              setFromValue(0);
            }
          }}
          minValue={0}
        />
      </View>
    </View>
  );
}
