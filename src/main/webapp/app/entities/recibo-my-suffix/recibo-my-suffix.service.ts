import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { ReciboMySuffix } from './recibo-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ReciboMySuffix>;

@Injectable()
export class ReciboMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/recibos';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/recibos';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(recibo: ReciboMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(recibo);
        return this.http.post<ReciboMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(recibo: ReciboMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(recibo);
        return this.http.put<ReciboMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ReciboMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ReciboMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<ReciboMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ReciboMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<ReciboMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<ReciboMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ReciboMySuffix[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ReciboMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ReciboMySuffix[]>): HttpResponse<ReciboMySuffix[]> {
        const jsonResponse: ReciboMySuffix[] = res.body;
        const body: ReciboMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ReciboMySuffix.
     */
    private convertItemFromServer(recibo: ReciboMySuffix): ReciboMySuffix {
        const copy: ReciboMySuffix = Object.assign({}, recibo);
        copy.fecha = this.dateUtils
            .convertDateTimeFromServer(recibo.fecha);
        return copy;
    }

    /**
     * Convert a ReciboMySuffix to a JSON which can be sent to the server.
     */
    private convert(recibo: ReciboMySuffix): ReciboMySuffix {
        const copy: ReciboMySuffix = Object.assign({}, recibo);

        copy.fecha = this.dateUtils.toDate(recibo.fecha);
        return copy;
    }
}
