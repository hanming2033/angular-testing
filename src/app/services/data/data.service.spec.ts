import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { DataService } from './data.service';
import { Post } from './post.model';

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    // * create new module with TestBed
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
      // providers: [DataService]
    });

    // * gives an injected version of the DataService
    service = TestBed.get(DataService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    // * ensure there is no request outstanding
    httpMock.verify();
  });

  it('should retrieve posts from API via GET', () => {
    const dummyPosts: Post[] = [
      { userId: '1', id: 1, body: 'Hello Word', title: 'Testing Angular' },
      { userId: '2', id: 2, body: 'Hello Word', title: 'Testing Angular2' }
    ];

    // * What to test - response
    service.getPosts().subscribe(posts => {
      // When observable resolves, result should match test data
      expect(posts).toEqual(dummyPosts);
    });

    // * What to test - http
    // The following `expectOne()` will match the request's URL.
    // If no requests or multiple requests matched that URL
    // `expectOne()` would throw.
    const req = httpMock.expectOne(`${service.ROOT_URL}/posts`);
    // Assert that the request is a GET.
    expect(req.request.method).toBe('GET');

    // * allowing getPosts method to use dummyPosts to fire the http request
    // Respond with mock data, causing Observable to resolve.
    // Subscribe callback asserts that correct data was returned.
    req.flush(dummyPosts);
  });

  it('should send request with correct header', () => {
    // no dummy data required - not testing response
    // const dummyPosts: Post[] = [{ userId: '1', id: 1, body: 'Hello Word', title: 'Testing Angular' }];

    // * What to test - response
    service.getPosts().subscribe(posts => {});

    // * What to test - http
    // Find request with a predicate function.
    // Expect one request with an authorization header
    const req = httpMock.expectOne(request => request.headers.has('Authorization'));
    // alternative to const req = httpMock.expectOne(request => request.url === `${service.ROOT_URL}/posts`);
    expect(req.request.headers.get('Authorization')).toBe('my-auth-token');

    // * fire http request using no data
    req.flush([]);
  });

  it('should send multiple requests', () => {
    const dummyPosts: Post[] = [
      { userId: '1', id: 1, body: 'Hello Word', title: 'Testing Angular' },
      { userId: '2', id: 2, body: 'Hello Word', title: 'Testing Angular2' }
    ];

    // * What to test - response
    service.getPosts().subscribe(posts => expect(posts.length).toEqual(0, 'should have no data'));
    service.getPosts().subscribe(posts => expect(posts).toEqual(dummyPosts, 'should have expected data'));

    // * What to test - http
    const reqs = httpMock.match(`${service.ROOT_URL}/posts`);
    expect(reqs.length).toEqual(2);

    // * fire http request using fake data
    reqs[0].flush([]);
    reqs[1].flush(dummyPosts);
  });

  it('should deal with 404 gracefully', () => {
    const errMsg = 'purposefully 404 error';

    // * What to test - response: error
    service.getPosts().subscribe(
      _ => fail('should have failed with the 404 error'),
      (err: HttpErrorResponse) => {
        expect(err.status).toEqual(404, 'status');
        expect(err.error).toEqual(errMsg, 'message');
      }
    );

    // * What to test - http: none
    const req = httpMock.expectOne(`${service.ROOT_URL}/posts`);

    // * fire http request using error
    req.flush(errMsg, { status: 404, statusText: 'Not Found' });
  });

  it('should deal with network gracefully', () => {
    const errMsg = 'simulated network error';
    // Create mock ErrorEvent, raised when something goes wrong at the network level.
    // Connection timeout, DNS error, offline, etc
    const mockError = new ErrorEvent('Network error', {
      message: errMsg,
      // The rest of this is optional and not used.
      // Just showing that you could provide this too.
      filename: 'HeroService.ts',
      lineno: 42,
      colno: 21
    });

    // * What to test - response: error
    service.getPosts().subscribe(
      data => fail('should have failed with the network error'),
      (error: HttpErrorResponse) => {
        expect(error.error.message).toEqual(errMsg, 'message');
      }
    );

    // * What to test - http: none
    const req = httpMock.expectOne(`${service.ROOT_URL}/posts`);

    // * fire http request using error
    req.error(mockError);
  });

  // ! what is this??
  it('httpTestingController.verify should fail if HTTP response not simulated', () => {
    // Sends request
    service.getPosts().subscribe();

    // verify() should fail because haven't handled the pending request.
    expect(() => httpMock.verify()).toThrow();

    // Now get and flush the request so that afterEach() doesn't fail
    const req = httpMock.expectOne(`${service.ROOT_URL}/posts`);
    req.flush(null);
  });
});
