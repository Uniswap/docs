/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {useEffect, useRef} from 'react';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

const getScrollPosition = () => ({
  scrollX: ExecutionEnvironment.canUseDOM ? window.pageXOffset : 0,
  scrollY: ExecutionEnvironment.canUseDOM ? window.pageYOffset : 0,
});

const useScrollPosition = (effect, deps = []) => {
  const scrollPosition = useRef(getScrollPosition());

  const handleScroll = () => {
    const currentScrollPosition = getScrollPosition();

    if (effect) {
      effect(currentScrollPosition, scrollPosition.current);
    }

    scrollPosition.current = currentScrollPosition;
  };

  useEffect(() => {
    const opts = {
      passive: true,
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, opts);
    return () => window.removeEventListener('scroll', handleScroll, opts);
  }, deps);
};

export default useScrollPosition;
