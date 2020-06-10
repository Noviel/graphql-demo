import { useState, useCallback } from 'react';
import { InputChangeEvent } from 'src/types';

export function useInputControl(initialValue: string) {
  const [value, setValue] = useState(initialValue);

  const handleChange = useCallback<InputChangeEvent>(
    (event) => {
      setValue(event.target.value);
    },
    [setValue]
  );

  return [value, handleChange, setValue] as const;
}
