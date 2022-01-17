/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import {
  View, Text, TextInput, FlatList, RefreshControl,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import CountryFlag from 'react-native-country-flag';
import scrapeData from '../scraper/exchangeRate';
import { getISOByParam } from '../scraper/isoCountryCurrency';
import currencyNames from '../data/currenciesName.json';

function RateItem({ item }) {
  return (
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}
    >
      <View style={{
        flexDirection: 'row',
        marginVertical: 8,
        alignItems: 'center',
      }}
      >
        <CountryFlag
          isoCode={getISOByParam('currency', item.currencyName)}
          size={50}
          style={{
            borderRadius: 6,
            marginRight: 16,
          }}
        />
        <View>
          <Text style={{
            fontSize: 14,
            fontWeight: 'bold',
            color: '#334155',
          }}
          >
            {item.currencyName}
            {' '}
            {currencyNames.filter((e) => e.cc === item.currencyName)[0] ? `(${currencyNames.filter((e) => e.cc === item.currencyName)[0]?.symbol})` : ''}
          </Text>
          <Text
            style={{
              color: '#94A3B8',
              fontSize: 12,
              width: 200,
            }}
            numberOfLines={1}
          >
            {currencyNames.filter((e) => e.cc === item.currencyName)[0]?.name}
          </Text>
        </View>
      </View>
      <Text style={{
        color: '#84CC16',
        flexShrink: 0,
      }}
      >
        {item.rate}
      </Text>
    </View>
  );
}

function ExchangeRate() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    scrapeData().then((res) => setData(res));
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    scrapeData().then((res) => { setData(res); setRefreshing(false); });
  }, []);

  return (
    <View style={{
      padding: 16,
    }}
    >
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
      }}
      >
        <Text style={{
          color: '#84CC16',
          fontSize: 12,
        }}
        >
          Last Updated
        </Text>
        <Text style={{
          fontSize: 12,
        }}
        >
          {new Date(data.time_last_update_unix * 1000).toLocaleString()}
        </Text>
      </View>
      <Text style={{
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#334155',
      }}
      >
        1 USD =
      </Text>
      <View style={{
        backgroundColor: 'white',
        flexDirection: 'row',
        padding: 12,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#F1F5F9',
        marginTop: 16,
        overflow: 'hidden',
      }}
      >
        <Feather name="search" size={24} color="#CBD5E1" />
        <TextInput
          onChangeText={setQuery}
          value={query}
          placeholder="Search currency"
          style={{
            marginLeft: 8,
          }}
          placeholderTextColor="#CBD5E1"
        />
      </View>
      {data.rates ? (
        <FlatList
          style={{
            marginTop: 12,
            marginBottom: 140,
          }}
          refreshControl={(
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          )}
          data={Object.entries(data.rates).filter(([k]) => k.toLowerCase().includes(query.toLowerCase()) || getISOByParam('currency', k)?.toLowerCase().includes(query.toLowerCase()) || currencyNames.filter((e) => e.cc === k)[0]?.name.toLowerCase().includes(query.toLowerCase())).filter(([k]) => getISOByParam('currency', k)).map(([k, v]) => ({
            currencyName: k,
            rate: v,
          }))}
          keyExtractor={(item) => item.currencyName}
          renderItem={({ item }) => (
            <RateItem item={item} />
          )}
        />
      ) : null}
    </View>
  );
}

export default ExchangeRate;
