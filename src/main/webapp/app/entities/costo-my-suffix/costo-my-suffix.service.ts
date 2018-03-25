import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CostoMySuffix } from './costo-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CostoMySuffix>;

@Injectable()
export class CostoMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/costos';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/costos';

    constructor(private http: HttpClient) { }

    create(costo: CostoMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(costo);
        return this.http.post<CostoMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(costo: CostoMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(costo);
        return this.http.put<CostoMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CostoMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CostoMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<CostoMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CostoMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<CostoMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<CostoMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CostoMySuffix[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CostoMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CostoMySuffix[]>): HttpResponse<CostoMySuffix[]> {
        const jsonResponse: CostoMySuffix[] = res.body;
        const body: CostoMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CostoMySuffix.
     */
    private convertItemFromServer(costo: CostoMySuffix): CostoMySuffix {
        const copy: CostoMySuffix = Object.assign({}, costo);
        return copy;
    }

    /**
     * Convert a CostoMySuffix to a JSON which can be sent to the server.
     */
    private convert(costo: CostoMySuffix): CostoMySuffix {
        const copy: CostoMySuffix = Object.assign({}, costo);
        return copy;
    }
}
