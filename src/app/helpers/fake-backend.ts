import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
 
export function fakeBackendFactory(backend: MockBackend, options: BaseRequestOptions) {

    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlByaW5jZSBTaW5naCIsImFkbWluIjp0cnVlfQ.IdCEE_CsqFpLMei0jjnvJBBmQKamsoH_OwyjUQvh3ZY';

    backend.connections.subscribe((connection: MockConnection) => {
      // setTimeout() function to simulate an asynchronous call 
      // to the server that takes 1 second. 
      setTimeout(() => {

        // Fake implementation of /api/authenticate

        if (connection.request.url.endsWith('/api/authenticate') && 
            connection.request.method === RequestMethod.Post) {
            let body = JSON.parse(connection.request.getBody());

            if (body.email === 'prince@cts.com' && body.password === '1234') {
              connection.mockRespond(new Response(
                new ResponseOptions({ 
                  status: 200, 
                  body: { token: token }
                })
              ));
            } else {
              connection.mockRespond(new Response(
                new ResponseOptions({ status: 200 })
              ));
            }
        }
        

      }, 1000);
    });
 
    return new Http(backend, options);
}
 
export let fakeBackendProvider = {
    provide: Http,
    useFactory: fakeBackendFactory,
    deps: [MockBackend, BaseRequestOptions]
};