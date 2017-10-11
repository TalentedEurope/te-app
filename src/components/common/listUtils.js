import React from 'react';
import { ActivityIndicator, View } from 'react-native';

export function renderHeader() {
  if (!this.state.initialLoading) return null;
  return (
    <View style={{ paddingVertical: 60 }}>
      <ActivityIndicator animating size="large" />
    </View>
  );
}

export function renderFooter() {
  if (!this.state.loadingMore) return null;
  return (
    <View style={{ paddingVertical: 10 }}>
      <ActivityIndicator animating size="large" />
    </View>
  );
}

export function handleLoadMore() {
  if (!this.state.lastPage && !this.state.initialLoading && !this.state.loadingMore) {
    this.setState(
      {
        page: this.state.page + 1,
      },
      () => {
        this.loadData();
      },
    );
  }
}
