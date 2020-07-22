import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Home from "../index";

it('renders home screen', () => {
    const navigation = { navigate: jest.fn() };
    expect(renderer.create(
        <Home navigation={navigation}/>
    ).toJSON()).toMatchSnapshot();
});
