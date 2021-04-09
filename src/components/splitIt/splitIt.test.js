import React from "react";
import {render, screen} from '@testing-library/react';

import { SplitIt } from "./splitIt";

describe("<SplitIt/> in base product info", () => {
  let props;
  beforeEach(() => {
    props = {
      total: 150,
      instalments: 3,
      over: 120,
      currency: "$",
      getData: jest.fn(),
      isLoaded: true
    };
    window.dataLayer = [];
  });

  it('should call getData prop on mount', () => {
    // Давайте отрендерим компонент и проверим что проп getData был вызван
  });

  it("should render text and button if total > over", () => {
    // Проверим что при условии, что сумма заказа больше минимального порога
    // компонент рендерит нужный текст и кнопку "learn more"
  });

  it("should NOT render text and button if total < over", () => {
    // Проверим что при условии, что сумма заказа меньше минимального порога
    // компонент ничего не рендерит
  });

  it("should NOT render text and button if data is loading", () => {
    // Проверим что компонент ничего не рендерит пока данные не загружены
  });

  test('learn more popup', () => {
    // Теперь давайте опишем взаимодействие пользователя с попапом

    // 1. Найдем кнопку "learn more", и кликнем по ней
    // 1.1. Проверим что была отправлена аналитика
    // 1.2. Проверим что попап отобразился, для этого проверим что на экране появился его заголовок
    //      с рассчетом суммы платежа (Your monthly payment $50 ($50 × 3 = $150))
    
    // 2. Найдем в попапе кнопку "Close", и кликнем по ней.
    // 2.1 Проверим что попап больше не отображается на экране.
  });
});
