const addParams = (
  url: string,
  params: Record<string, string | number | null | undefined>
) => {
  // output: 'https://example.com?name=John&age=20'
  const filteredParams = Object.fromEntries(
    Object.entries(params)
      .filter(
        ([, value]) => value !== null && value !== undefined && value !== ""
      )
      .map(([key, value]) => [key, String(value)])
  );
  const searchParams = new URLSearchParams(filteredParams);
  return `${url}?${searchParams.toString()}`;
};

export default {
  addParams,
};
