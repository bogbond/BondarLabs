import {DurableObject} from 'cloudflare:workers';
import gateway, {EnquirySession as SessionLogic} from './worker.mjs';

// Only Worker entry points are exported to workerd. Validation helpers remain
// importable from worker.mjs for local tests, not as deployed service bindings.
export class EnquirySession extends DurableObject {
  constructor(ctx,env){super(ctx,env);this.session=new SessionLogic(ctx,env);}
  fetch(request){return this.session.fetch(request);}
  alarm(){return this.session.alarm();}
}
export default gateway;
