import { shallowMount } from "@vue/test-utils";
import CountryList from "@components/CountryList.vue";


const mockCountries = [
  { name: { common: "India" }, region: "Asia" },
  { name: { common: "Germany" }, region: "Europe" },
];


global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockCountries),
  })
) as jest.Mock;

describe("CountryList.vue", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the component", () => {
    const wrapper = shallowMount(CountryList);
    expect(wrapper.exists()).toBe(true);
   
  });

  it("fetches countries on mount", async () => {
    const wrapper = shallowMount(CountryList);
    await Promise.resolve(); 
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.countries.length).toBe(2); 
  });

 
 

 
});
