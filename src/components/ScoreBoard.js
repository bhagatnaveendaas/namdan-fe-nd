import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/AshramDashboard';
import theme from '../constants/theme';

// theme;
const ScoreBoard = () => (
  <View style={styles.scoreBoard}>
    <View style={{ flexDirection: 'column' }}>
      <View style={[styles.prathamDiv, { padding: '8%' }]}>
        <Text style={{
          color: theme.colors.white, textAlign: 'center', fontWeight: 'bold', fontSize: 25
        }}
        >
          123,456,789
        </Text>
        <Text style={{
          color: theme.colors.white, textAlign: 'center', fontWeight: 'bold', paddingTop: '1%'
        }}
        >
          PRATHAM NAM
        </Text>
      </View>
      <View style={{ flexDirection: 'row', alignContent: 'center', alignSelf: 'center' }}>
        <View style={{
          borderRightColor: theme.colors.white, borderRightWidth: 1, paddingVertical: '2%', width: '50%'
        }}
        >
          <View style={[styles.prathamDiv, {
            paddingBottom: '10%', borderBottomColor: theme.colors.white, borderBottomWidth: 1, width: '80%', alignContent: 'center', alignSelf: 'center'
          }]}
          >
            <Text style={{
              color: theme.colors.white, fontWeight: 'bold', fontSize: 20, textAlign: 'center'
            }}
            >
              123,456,789
            </Text>
            <Text style={{
              color: theme.colors.white, textAlign: 'center', fontWeight: 'bold', paddingTop: '1%'
            }}
            >
              SATNAM
            </Text>
          </View>
          <View style={[styles.prathamDiv, { paddingVertical: '10%' }]}>
            <Text style={{
              color: theme.colors.white, fontWeight: 'bold', fontSize: 20, textAlign: 'center'
            }}
            >
              123,456,789
            </Text>
            <Text style={{
              color: theme.colors.white, textAlign: 'center', fontWeight: 'bold', paddingTop: '1%'
            }}
            >
              PENDING
              {'\n'}
              SATNAM
              {' '}
            </Text>
          </View>
        </View>
        <View style={{ borderRightColor: theme.colors.white, paddingVertical: '2%', width: '50%' }}>
          <View style={[styles.prathamDiv, {
            paddingBottom: '10%', borderBottomColor: theme.colors.white, borderBottomWidth: 1, width: '80%'
          }]}
          >
            <Text style={{
              color: theme.colors.white, fontWeight: 'bold', fontSize: 20, textAlign: 'center'
            }}
            >
              123,456,789
            </Text>
            <Text style={{
              color: theme.colors.white, textAlign: 'center', fontWeight: 'bold', paddingTop: '1%'
            }}
            >
              SARNAM
            </Text>
          </View>
          <View style={[styles.prathamDiv, { paddingVertical: '10%' }]}>
            <Text style={{
              color: theme.colors.white, fontWeight: 'bold', fontSize: 20, textAlign: 'center'
            }}
            >
              123,456,789
            </Text>
            <Text style={{
              color: theme.colors.white, textAlign: 'center', fontWeight: 'bold', paddingTop: '1%'
            }}
            >
              PUNAR
              {'\n'}
              UPDESH
            </Text>
          </View>
        </View>
      </View>
    </View>
  </View>

);

export default ScoreBoard;
