let _serviceUrl ='';

const environment = window.location.hostname;
switch (environment) {
    case 'localhost':
        _serviceUrl = 'https://localhost:44353/'
        break;
    default:
        _serviceUrl = '#{serviceUrl}'
}
export let Configuration = {
    baseUrls: {
        customer: 'api/SalesPerson/customer-data',
        sales: 'api/SalesPerson'
    },
    serviceUrl: _serviceUrl
}
