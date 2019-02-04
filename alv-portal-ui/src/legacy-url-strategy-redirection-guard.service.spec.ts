import { LegacyUrlStrategyRedirectionGuard } from './legacy-url-strategy-redirection-guard.service';
import { Router, RouterStateSnapshot } from '@angular/router';

const mockRouter = jasmine.createSpyObj('Router', ['navigate', 'navigateByUrl']);

const mockRouterState: RouterStateSnapshot = {
  url: null,
  root: {
    url: null,
    fragment: '#/sooosm',
    params: [],
    queryParams: [],
    data: null,
    outlet: null,
    component: null,
    routeConfig: null,
    root: null,
    parent: null,
    firstChild: null,
    paramMap: null,
    queryParamMap: null,
    children: [],
    pathFromRoot: null
  }
};


describe('AuthGuard', () => {

  describe('canActivate', () => {
    let urlStrategy: LegacyUrlStrategyRedirectionGuard;

    it('should return false for non-matching urls fragments', () => {
      const fragment = 'nonexistingfragment';
      mockRouterState.root.fragment = fragment;
      urlStrategy = new LegacyUrlStrategyRedirectionGuard(mockRouter);
      expect(urlStrategy.canActivate(null, mockRouterState)).toEqual(false);
      expect(mockRouter.navigateByUrl).not.toHaveBeenCalled();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['home']);
    });

    it('should return false and redirect for matching job-publication-detail legacy fragment', () => {
      const pageId = 'examplePageId';
      mockRouterState.root.fragment = '/job-publication-detail/' + pageId;
      urlStrategy = new LegacyUrlStrategyRedirectionGuard(mockRouter);
      const canIt = urlStrategy.canActivate(null, mockRouterState);
      expect(canIt).toEqual(false);
      expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('manage-job-ads/' + pageId);
    });

    it('should return false and redirect for matching job-fingerprint-redirect legacy fragment', () => {
      const fingerprint = 'exampleFigerprint';
      mockRouterState.root.fragment = '/job-fingerprint-redirect?' + fingerprint;
      urlStrategy = new LegacyUrlStrategyRedirectionGuard(mockRouter);
      const canIt = urlStrategy.canActivate(null, mockRouterState);
      expect(canIt).toEqual(false);
      expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('job-search/job-fingerprint-redirect?' + fingerprint);
    });

  });
});
