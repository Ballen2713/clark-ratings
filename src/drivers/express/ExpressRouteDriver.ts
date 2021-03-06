import { ExpressResponder } from './ExpressResponder';
import { DataStore, Responder } from '../../interfaces/interfaces';
import { Router } from 'express'; 
import { RatingsInteractor } from '../../interactors/RatingsInteractor';

/**
 * A factory for producing a router for the express app.
 *
 * @author Sean Donnelly
 */
export class ExpressRouteDriver {
  /**
   * Produces a configured express router
   *
   * @param dataStore the data store that the routes should utilize
   */
  public static buildRouter(dataStore: DataStore) {
    let e = new ExpressRouteDriver(dataStore,);
    let router: Router = Router();
    e.setRoutes(router);
    return router;
  }

  private constructor(private dataStore: DataStore) {}

  private getResponder(res): Responder {
    return new ExpressResponder(res);
  }

  /**
   * Defines the active routes for the API. Routes take an async callback function that contains a request and response object.
   * The callback awaits a particular interactor function that executes the connected business use case.
   *
   * @param router the router being used by the webserver
   */
  private setRoutes(router: Router) {
    // new instance of RatingsInteractor
    const interactor = new RatingsInteractor();

    router.get('/', (req, res) => {
      // default route
        res.send('Welcome to the CLARK Rating Service');
    });

    router.route('/ratings/:ratingId')
    .get(async (req, res) => {
       // return the specified rating 
       const responder = this.getResponder(res);
       try {
          const rating = await interactor.getRating(this.dataStore, req.params.ratingId);
          responder.sendRatings(rating);
       } catch (error) {
          responder.sendOperationError(error);
       }
    });
  
    router.route('/learning-objects/:learningObjectAuthor/:learningObjectName/ratings')
    .get(async (req, res) => {
      // return all ratings from the associated learning object
      const responder            = this.getResponder(res);
      const learningObjectName   = req.params.learningObjectName;
      const learningObjectAuthor = req.params.learningObjectAuthor;
      try {
        const ratings = await interactor.getLearningObjectRatings(this.dataStore, learningObjectName, learningObjectAuthor);
        responder.sendRatings(ratings);
      } catch (error) {
        responder.sendOperationError(error);
      }
    });

    // TODO - no use case for this route yet
    // router.route('/users/:username/ratings')
    // .get(async (req, res) => {
    //   // get all of a user's ratings (all ratings made by a user)
    //   const responder = this.getResponder(res);
    //   const username  = req.params.username;
    //   try {
    //     await interactor.getUsersRatings(this.dataStore, username);
    //     responder.sendOperationSuccess();
    //   } catch (error) {
    //     responder.sendOperationError(error);
    //   }
    // });
  }
}
