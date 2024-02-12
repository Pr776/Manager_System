package com.ldtech.manager.security;


import com.ldtech.manager.entities.User;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.security.Key;
import java.security.SignatureException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtTokenProvider {

//    @Value("${app.jwt-secret}")
//    private String jwtSecret;
//    @Value("${app.jwt-expiration-milliseconds}")
//    private int jwtExpirationInMs;
//
//    // generate token
//    public String generateToken(Authentication authentication){
//        String username = authentication.getName();
//        Date currentDate = new Date(System.currentTimeMillis());
//        Date expireDate = new Date(System.currentTimeMillis()+ jwtExpirationInMs);
//
//        String token = Jwts.builder().setSubject(username)
//                .setIssuedAt(currentDate)
//                .setExpiration(expireDate)
//                .signWith(getSignKey(),SignatureAlgorithm.HS256)
//                .compact();
//        return token;
//    }
//
//    private Key getSignKey(){
//        byte[] key = Decoders.BASE64.decode(jwtSecret);
//        return Keys.hmacShaKeyFor(key);
//    }
//
//
//
//    // get username from the token
//    public String getUsernameFromJWT(String token){
//        return extractClaim(token, Claims::getSubject);
//    }
//
//    private <T> T extractClaim(String token, Function<Claims, T> claimsResolved){
//        final Claims claims = extractAllClaims(token);
//        return claimsResolved.apply(claims);
//    }
//
//    private Claims extractAllClaims(String token){
//        return Jwts.parserBuilder().setSigningKey(getSignKey()).build().parseClaimsJws(token).getBody();
//    }
//
//    // validate JWT token
//    public boolean validateToken(String token, UserDetails userDetails) throws SignatureException {
////        try{
////            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token);
////            return true;
////        } catch (MalformedJwtException ex) {
////            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid JWT token");
////        } catch (ExpiredJwtException ex) {
////            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Expired JWT token");
////        } catch (UnsupportedJwtException ex) {
////            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Unsupported JWT token");
////        } catch (IllegalArgumentException ex) {
////            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "JWT claims string is empty.");
////        }
//        final String username = getUsernameFromJWT(token);
//        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
//    }
//
//    private boolean isTokenExpired(String token) {
//        return extractClaim(token, Claims::getExpiration).before(new Date());
//    }


//    --------------------------------------------------------------------------------------------

    public static final String SECRET = "5367566B59703373367639792F423F4528482B4D6251655468576D5A71347437";

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    public String generateToken(String userName){
        Map<String,Object> claims=new HashMap<>();
        return createToken(claims,userName);
    }

    private String createToken(Map<String, Object> claims, String userName) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(userName)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis()+1000*60*30))
                .signWith(getSignKey(), SignatureAlgorithm.HS256).compact();
    }

    private Key getSignKey() {
        byte[] keyBytes= Decoders.BASE64.decode(SECRET);
        return Keys.hmacShaKeyFor(keyBytes);
    }



}
