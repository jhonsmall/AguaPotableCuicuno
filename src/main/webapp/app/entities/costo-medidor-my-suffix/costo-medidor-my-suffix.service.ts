import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { CostoMedidorMySuffix } from './costo-medidor-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CostoMedidorMySuffix>;

@Injectable()
export class CostoMedidorMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/costo-medidors';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/costo-medidors';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(costoMedidor: CostoMedidorMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(costoMedidor);
        return this.http.post<CostoMedidorMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(costoMedidor: CostoMedidorMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(costoMedidor);
        return this.http.put<CostoMedidorMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CostoMedidorMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CostoMedidorMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<CostoMedidorMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CostoMedidorMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<CostoMedidorMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<CostoMedidorMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CostoMedidorMySuffix[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CostoMedidorMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CostoMedidorMySuffix[]>): HttpResponse<CostoMedidorMySuffix[]> {
        const jsonResponse: CostoMedidorMySuffix[] = res.body;
        const body: CostoMedidorMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CostoMedidorMySuffix.
     */
    private convertItemFromServer(costoMedidor: CostoMedidorMySuffix): CostoMedidorMySuffix {
        const copy: CostoMedidorMySuffix = Object.assign({}, costoMedidor);
        copy.fecha = this.dateUtils
            .convertDateTimeFromServer(costoMedidor.fecha);
        return copy;
    }

    /**
     * Convert a CostoMedidorMySuffix to a JSON which can be sent to the server.
     */
    private convert(costoMedidor: CostoMedidorMySuffix): CostoMedidorMySuffix {
        const copy: CostoMedidorMySuffix = Object.assign({}, costoMedidor);

        copy.fecha = this.dateUtils.toDate(costoMedidor.fecha);
        return copy;
    }
}
