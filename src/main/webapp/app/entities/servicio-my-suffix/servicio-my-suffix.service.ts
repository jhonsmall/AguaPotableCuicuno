import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ServicioMySuffix } from './servicio-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ServicioMySuffix>;

@Injectable()
export class ServicioMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/servicios';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/servicios';

    constructor(private http: HttpClient) { }

    create(servicio: ServicioMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(servicio);
        return this.http.post<ServicioMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(servicio: ServicioMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(servicio);
        return this.http.put<ServicioMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ServicioMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ServicioMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<ServicioMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ServicioMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<ServicioMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<ServicioMySuffix[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ServicioMySuffix[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ServicioMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ServicioMySuffix[]>): HttpResponse<ServicioMySuffix[]> {
        const jsonResponse: ServicioMySuffix[] = res.body;
        const body: ServicioMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ServicioMySuffix.
     */
    private convertItemFromServer(servicio: ServicioMySuffix): ServicioMySuffix {
        const copy: ServicioMySuffix = Object.assign({}, servicio);
        return copy;
    }

    /**
     * Convert a ServicioMySuffix to a JSON which can be sent to the server.
     */
    private convert(servicio: ServicioMySuffix): ServicioMySuffix {
        const copy: ServicioMySuffix = Object.assign({}, servicio);
        return copy;
    }
}
