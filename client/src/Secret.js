import React, { useEffect, useState } from 'react';

export default function Secret() {
const [data, setData] = useState('Идет загрузка...')
  useEffect(() => {
    (async () => {
      const response = await fetch('/api/secret');
      const json = await response.json()
      setData(JSON.stringify(json));
    })()
  }, [])

  return data
}
