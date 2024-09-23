# react-native-custom-refresh-controller

A simple pull-to-refresh component for React Native that works without ScrollView or FlatList.

## Installation

```bash
npm install react-native-custom-refresh-controller
```

# Getting started 🚀

```js
import CustomRefreshController from 'react-native-custom-refresh-controller';

 const handleRefresh = () => {
    return new Promise(resolve => {
      resolve()
    });
  };


 <CustomRefreshController
    onRefresh={handleRefresh}
    loaderColor=''
    loaderColor = '#0000ff',   // Default loader color
    loaderSize = 'large',      // Default loader size
    loaderBackground = 'rgba(255, 255, 255, 0.6)' // Default background for loader overlay'>
      ......
</CustomRefreshController>
```